'use client';

import { Order } from '@/lib/types/Order';
import StatusBadge from './StatusBadge';
import Link from 'next/link';
import Image from 'next/image';

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4 flex gap-4">
      {/* Order Image */}
      <div className="w-20 h-20 shrink-0 bg-gray-100 rounded-lg overflow-hidden">
        {order.image ? (
          <Image
            src={order.image}
            alt={order.orderNumber}
            width={80}
            height={80}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-xs text-gray-500">No image</span>
          </div>
        )}
      </div>

      {/* Order Details - Left Side */}
      <div className="flex-1 flex flex-col justify-center">
        <p className="text-xs text-gray-500 mb-1">Placed on {order.createdDate} | 09:45AM</p>
        <h3 className="font-semibold text-gray-900 mb-1">{order.orderNumber}</h3>
        <p className="text-sm text-gray-600">Estimated delivery: {order.estimatedDelivery}</p>
      </div>

      {/* Status Badge - Center */}
      <div className="flex items-center px-4">
        <StatusBadge status={order.status} />
      </div>

      {/* View Details Link - Right Side */}
      <div className="flex items-center">
        <Link
          href={`/order/${order.id}`}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium whitespace-nowrap"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
