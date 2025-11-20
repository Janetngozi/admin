'use client';

import Link from 'next/link';
import { mockOrders } from '@/lib/data/mockOrders';
import OrderCard from '@/app/components/order/OrderCard';

export default function MyOrders() {
  // Get the first 3 orders to display in account page
  const recentOrders = mockOrders.slice(0, 3);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Orders</h2>
        <Link href="/order" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
          View All
        </Link>
      </div>

      <div className="space-y-4">
        {recentOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
