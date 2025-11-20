import { Queue } from 'bullmq';
import { defaultQueueOptions, QUEUE_NAMES } from './config';

export interface InventorySyncJobData {
  productIds?: string[]; // If undefined, sync all products
  fullSync?: boolean;
}

export const inventorySyncQueue = new Queue<InventorySyncJobData>(
  QUEUE_NAMES.INVENTORY_SYNC,
  defaultQueueOptions
);

// Queue event listeners for monitoring
inventorySyncQueue.on('completed', (job) => {
  console.log(`✅ Inventory sync job ${job.id} completed`);
});

inventorySyncQueue.on('failed', (job, err) => {
  console.error(`❌ Inventory sync job ${job?.id} failed:`, err.message);
});



