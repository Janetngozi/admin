import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { orderSyncQueue } from '@/lib/queues/orderSyncQueue';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-18.acacia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId;

      if (!orderId) {
        console.error('Order ID not found in session metadata');
        return NextResponse.json({ received: true });
      }

      // Update order status to PAID
      const order = await prisma.order.update({
        where: { id: orderId },
        data: {
          status: 'PAID',
          paymentStatus: 'paid',
          paymentIntentId: session.payment_intent as string,
          paidAt: new Date(),
        },
        include: {
          user: true,
        },
      });

      // Add order to sync queue
      await orderSyncQueue.add('sync-order', {
        orderId: order.id,
        userId: order.userId,
      });

      // Update cart - clear items
      await prisma.cartItem.deleteMany({
        where: { userId: order.userId },
      });

      // Update inventory
      const orderItems = await prisma.orderItem.findMany({
        where: { orderId: order.id },
        include: { product: true },
      });

      for (const item of orderItems) {
        await prisma.product.update({
          where: { id: item.productId },
          data: {
            stockQty: {
              decrement: item.quantity,
            },
          },
        });

        await prisma.inventoryLog.create({
          data: {
            productId: item.productId,
            changeType: 'sale',
            quantity: -item.quantity,
            previousQty: item.product.stockQty + item.quantity,
            newQty: item.product.stockQty - item.quantity,
            reason: `Order ${order.orderNumber}`,
            referenceId: order.id,
          },
        });
      }

      console.log(`✅ Order ${order.orderNumber} paid and queued for sync`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}



