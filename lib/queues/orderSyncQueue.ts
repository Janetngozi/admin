import { Queue } from 'bullmq';
import { defaultQueueOptions, QUEUE_NAMES } from './config';

export interface OrderSyncJobData {
  orderId: string;
  userId: string;
  retryCount?: number;
}

export const orderSyncQueue = new Queue<OrderSyncJobData>(
  QUEUE_NAMES.ORDER_SYNC,
  defaultQueueOptions
);

// Queue event listeners for monitoring
orderSyncQueue.on('completed', (job) => {
  console.log(`✅ Order sync job ${job.id} completed`);
});

orderSyncQueue.on('failed', (job, err) => {
  console.error(`❌ Order sync job ${job?.id} failed:`, err.message);
});

orderSyncQueue.on('progress', (job, progress) => {
  console.log(`🔄 Order sync job ${job.id} progress: ${progress}%`);
});



