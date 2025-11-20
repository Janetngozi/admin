'use client';

import React, { useState } from 'react';
import { ChevronDown, Eye, Trash2 } from 'lucide-react';
import Link from 'next/link';

type OrderStatus =
  | 'Order Confirmed'
  | 'Payment Approved'
  | 'Order Processing'
  | 'Order Shipping';

type PaymentStatus = 'Unpaid' | 'Paid';

interface Order {
  id: string;
  name: string;
  customerType: 'Commercial' | 'Government';
  date: string;
  po: string;
  orderStatus: OrderStatus;
  total: string;
  items: number;
  trackingNumber: string;
  paymentStatus: PaymentStatus;
}

const orders: Order[] = [
  {
    id: '#STC-123456',
    name: 'John Doe',
    customerType: 'Commercial',
    date: 'Dec 15, 2025',
    po: '----------',
    orderStatus: 'Order Confirmed',
    total: '$450',
    items: 5,
    trackingNumber: 'UPS 1Z45W9X70320418523',
    paymentStatus: 'Unpaid',
  },
  {
    id: '#STC-123456',
    name: 'John Doe',
    customerType: 'Government',
    date: 'Dec 15, 2025',
    po: 'PO-123456',
    orderStatus: 'Payment Approved',
    total: '$450',
    items: 5,
    trackingNumber: 'UPS 1Z45W9X70320418523',
    paymentStatus: 'Paid',
  },
  {
    id: '#STC-123456',
    name: 'John Doe',
    customerType: 'Government',
    date: 'Dec 15, 2025',
    po: 'PO-123456',
    orderStatus: 'Order Processing',
    total: '$450',
    items: 5,
    trackingNumber: 'UPS 1Z45W9X70320418523',
    paymentStatus: 'Unpaid',
  },
  {
    id: '#STC-123456',
    name: 'John Doe',
    customerType: 'Commercial',
    date: 'Dec 15, 2025',
    po: '----------',
    orderStatus: 'Order Shipping',
    total: '$450',
    items: 5,
    trackingNumber: 'UPS 1Z45W9X70320418523',
    paymentStatus: 'Paid',
  },
  {
    id: '#STC-123456',
    name: 'John Doe',
    customerType: 'Commercial',
    date: 'Dec 15, 2025',
    po: '----------',
    orderStatus: 'Order Confirmed',
    total: '$450',
    items: 5,
    trackingNumber: 'UPS 1Z45W9X70320418523',
    paymentStatus: 'Unpaid',
  },
  {
    id: '#STC-123456',
    name: 'John Doe',
    customerType: 'Government',
    date: 'Dec 15, 2025',
    po: 'PO-123456',
    orderStatus: 'Payment Approved',
    total: '$450',
    items: 5,
    trackingNumber: 'UPS 1Z45W9X70320418523',
    paymentStatus: 'Paid',
  },
  {
    id: '#STC-123456',
    name: 'John Doe',
    customerType: 'Commercial',
    date: 'Dec 15, 2025',
    po: '----------',
    orderStatus: 'Order Processing',
    total: '$450',
    items: 5,
    trackingNumber: 'UPS 1Z45W9X70320418523',
    paymentStatus: 'Unpaid',
  },
  {
    id: '#STC-123456',
    name: 'John Doe',
    customerType: 'Government',
    date: 'Dec 15, 2025',
    po: 'PO-123456',
    orderStatus: 'Order Shipping',
    total: '$450',
    items: 5,
    trackingNumber: 'UPS 1Z45W9X70320418523',
    paymentStatus: 'Paid',
  },
  {
    id: '#STC-123456',
    name: 'John Doe',
    customerType: 'Commercial',
    date: 'Dec 15, 2025',
    po: '----------',
    orderStatus: 'Payment Approved',
    total: '$450',
    items: 5,
    trackingNumber: 'UPS 1Z45W9X70320418523',
    paymentStatus: 'Unpaid',
  },
  {
    id: '#STC-123456',
    name: 'John Doe',
    customerType: 'Government',
    date: 'Dec 15, 2025',
    po: 'PO-123456',
    orderStatus: 'Order Confirmed',
    total: '$450',
    items: 5,
    trackingNumber: 'UPS 1Z45W9X70320418523',
    paymentStatus: 'Paid',
  },
];

const getOrderStatusColor = (status: OrderStatus) => {
  switch (status) {
    case 'Order Confirmed':
      return 'bg-white text-gray-900 border border-gray-300';
    case 'Payment Approved':
      return 'bg-blue-100 text-blue-700 border border-blue-200';
    case 'Order Processing':
      return 'bg-orange-100 text-orange-700 border border-orange-200';
    case 'Order Shipping':
      return 'bg-green-100 text-green-700 border border-green-200';
    default:
      return 'bg-gray-100 text-gray-700 border border-gray-200';
  }
};

const getPaymentStatusColor = (status: PaymentStatus) => {
  switch (status) {
    case 'Paid':
      return 'bg-green-100 text-green-700 border border-green-200';
    case 'Unpaid':
      return 'bg-red-100 text-red-700 border border-red-200';
    default:
      return 'bg-gray-100 text-gray-700 border border-gray-200';
  }
};

export default function OrdersFullPage() {
  const [sortDropdown, setSortDropdown] = useState<string | null>(null);

  const toggleSort = (column: string) => {
    setSortDropdown(sortDropdown === column ? null : column);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800 text-white px-6 py-4 rounded-t-lg">
        <h1 className="text-xl font-bold">Order - Full</h1>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Order ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  <div className="flex items-center gap-2">
                    <span>Name</span>
                    <button
                      onClick={() => toggleSort('name')}
                      className="relative"
                    >
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  <div className="flex items-center gap-2">
                    <span>Customer Type</span>
                    <button
                      onClick={() => toggleSort('customerType')}
                      className="relative"
                    >
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  <div className="flex items-center gap-2">
                    <span>Date</span>
                    <button
                      onClick={() => toggleSort('date')}
                      className="relative"
                    >
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  <div className="flex items-center gap-2">
                    <span>PO</span>
                    <button
                      onClick={() => toggleSort('po')}
                      className="relative"
                    >
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  <div className="flex items-center gap-2">
                    <span>Order Status</span>
                    <button
                      onClick={() => toggleSort('orderStatus')}
                      className="relative"
                    >
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Total
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Items
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Tracking Number
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  <div className="flex items-center gap-2">
                    <span>Payment Status</span>
                    <button
                      onClick={() => toggleSort('paymentStatus')}
                      className="relative"
                    >
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {order.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {order.customerType}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {order.po}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-lg text-sm font-medium border ${getOrderStatusColor(
                        order.orderStatus
                      )}`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {order.total}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {order.items}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {order.trackingNumber}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-lg text-sm font-medium border ${getPaymentStatusColor(
                        order.paymentStatus
                      )}`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/orders/${order.id.replace('#', '')}`}
                        className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center hover:bg-green-200 transition-colors"
                      >
                        <Eye className="w-4 h-4 text-green-600" />
                      </Link>
                      <button className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

