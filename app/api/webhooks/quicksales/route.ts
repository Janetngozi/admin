import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { quickSalesClient } from '@/lib/quicksales/client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-quicksales-signature') || '';

    // Verify webhook signature
    if (!quickSalesClient.verifyWebhookSignature(body, signature)) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    const data = JSON.parse(body);
    const { event, orderId, status, trackingNumber } = data;

    // Handle order status update
    if (event === 'order.status.updated' && orderId) {
      const order = await prisma.order.findFirst({
        where: { quickSalesOrderId: orderId },
      });

      if (order) {
        // Map QuickSales status to our status
        const statusMap: Record<string, string> = {
          'processing': 'PROCESSING',
          'shipped': 'SHIPPED',
          'delivered': 'DELIVERED',
          'cancelled': 'CANCELLED',
        };

        const updateData: any = {
          status: statusMap[status] || order.status,
        };

        if (status === 'shipped' && trackingNumber) {
          updateData.trackingNumber = trackingNumber;
          updateData.shippedAt = new Date();
        }

        if (status === 'delivered') {
          updateData.deliveredAt = new Date();
        }

        await prisma.order.update({
          where: { id: order.id },
          data: updateData,
        });

        // Log sync
        await prisma.syncLog.create({
          data: {
            type: 'order',
            entityId: order.id,
            status: 'success',
            message: `Order status updated from QuickSales: ${status}`,
            responseData: data as any,
          },
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('QuickSales webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}



