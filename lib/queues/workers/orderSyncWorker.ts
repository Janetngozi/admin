import { Worker, Job } from 'bullmq';
import { defaultQueueOptions, QUEUE_NAMES } from '../config';
import { OrderSyncJobData } from '../orderSyncQueue';
import { prisma } from '@/lib/prisma';
import { quickSalesClient } from '@/lib/quicksales/client';

const worker = new Worker<OrderSyncJobData>(
  QUEUE_NAMES.ORDER_SYNC,
  async (job: Job<OrderSyncJobData>) => {
    const { orderId, userId } = job.data;

    try {
      // Fetch order from database
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: {
          items: {
            include: {
              product: true,
            },
          },
          user: true,
        },
      });

      if (!order) {
        throw new Error(`Order ${orderId} not found`);
      }

      // Update sync status to SYNCING
      await prisma.order.update({
        where: { id: orderId },
        data: { quickSalesSyncStatus: 'SYNCING' },
      });

      // Log sync attempt
      await prisma.syncLog.create({
        data: {
          type: 'order',
          entityId: orderId,
          userId,
          status: 'success',
          message: 'Starting order sync to QuickSales',
        },
      });

      // Transform order data for QuickSales API
      const quickSalesOrder = {
        orderNumber: order.orderNumber,
        customerEmail: order.user.email,
        customerName: `${order.user.firstName || ''} ${order.user.lastName || ''}`.trim(),
        items: order.items.map((item) => ({
          sku: item.sku,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        subtotal: order.subtotal,
        tax: order.tax,
        shipping: order.shipping,
        discount: order.discount,
        total: order.total,
        currency: order.currency,
        status: order.status,
      };

      // Send to QuickSales
      const response = await quickSalesClient.createOrder(quickSalesOrder);

      // Update order with QuickSales order ID
      await prisma.order.update({
        where: { id: orderId },
        data: {
          quickSalesOrderId: response.orderId,
          quickSalesSyncStatus: 'SYNCED',
          quickSalesSyncAt: new Date(),
        },
      });

      // Log success
      await prisma.syncLog.create({
        data: {
          type: 'order',
          entityId: orderId,
          userId,
          status: 'success',
          message: `Order synced successfully. QuickSales Order ID: ${response.orderId}`,
          responseData: response as any,
        },
      });

      return { success: true, quickSalesOrderId: response.orderId };
    } catch (error: any) {
      // Update order sync status
      await prisma.order.update({
        where: { id: orderId },
        data: {
          quickSalesSyncStatus: 'FAILED',
          quickSalesError: error.message,
        },
      });

      // Log error
      await prisma.syncLog.create({
        data: {
          type: 'order',
          entityId: orderId,
          userId,
          status: 'error',
          message: error.message,
          errorCode: error.code,
          requestData: job.data as any,
        },
      });

      throw error; // Re-throw to trigger retry
    }
  },
  {
    connection: defaultQueueOptions.connection,
    concurrency: 5, // Process 5 orders concurrently
  }
);

worker.on('completed', (job) => {
  console.log(`✅ Order sync completed for order ${job.data.orderId}`);
});

worker.on('failed', (job, err) => {
  console.error(`❌ Order sync failed for order ${job?.data.orderId}:`, err.message);
});

console.log('🚀 Order sync worker started');

// Keep process alive
process.on('SIGTERM', async () => {
  await worker.close();
  process.exit(0);
});



