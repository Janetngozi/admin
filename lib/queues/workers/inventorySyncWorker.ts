import { Worker, Job } from 'bullmq';
import { defaultQueueOptions, QUEUE_NAMES } from '../config';
import { InventorySyncJobData } from '../inventorySyncQueue';
import { prisma } from '@/lib/prisma';
import { quickSalesClient } from '@/lib/quicksales/client';

const worker = new Worker<InventorySyncJobData>(
  QUEUE_NAMES.INVENTORY_SYNC,
  async (job: Job<InventorySyncJobData>) => {
    const { productIds, fullSync } = job.data;

    try {
      // Fetch products to sync
      const where = productIds
        ? { id: { in: productIds } }
        : fullSync
        ? {}
        : { quickSalesId: { not: null } }; // Only sync products already in QuickSales

      const products = await prisma.product.findMany({
        where,
        take: 100, // Process in batches
      });

      if (products.length === 0) {
        return { success: true, synced: 0 };
      }

      let synced = 0;
      let errors = 0;

      // Sync each product
      for (const product of products) {
        try {
          // Fetch inventory from QuickSales
          const inventory = await quickSalesClient.getInventory(product.sku);

          // Update product stock
          const previousQty = product.stockQty;
          await prisma.product.update({
            where: { id: product.id },
            data: {
              stockQty: inventory.quantity,
              inStock: inventory.quantity > 0,
            },
          });

          // Log inventory change
          await prisma.inventoryLog.create({
            data: {
              productId: product.id,
              changeType: 'sync',
              quantity: inventory.quantity - previousQty,
              previousQty,
              newQty: inventory.quantity,
              reason: 'QuickSales inventory sync',
            },
          });

          synced++;
        } catch (error: any) {
          errors++;
          console.error(`Failed to sync product ${product.sku}:`, error.message);

          // Log error
          await prisma.syncLog.create({
            data: {
              type: 'inventory',
              entityId: product.id,
              status: 'error',
              message: `Failed to sync inventory: ${error.message}`,
              errorCode: error.code,
            },
          });
        }
      }

      return { success: true, synced, errors };
    } catch (error: any) {
      console.error('Inventory sync job failed:', error);
      throw error;
    }
  },
  {
    connection: defaultQueueOptions.connection,
    concurrency: 3, // Process 3 products concurrently
  }
);

worker.on('completed', (job, result) => {
  console.log(`✅ Inventory sync completed: ${result.synced} synced, ${result.errors} errors`);
});

worker.on('failed', (job, err) => {
  console.error(`❌ Inventory sync failed:`, err.message);
});

console.log('🚀 Inventory sync worker started');

// Keep process alive
process.on('SIGTERM', async () => {
  await worker.close();
  process.exit(0);
});



