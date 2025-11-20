'use client';

import React, { useState } from 'react';
import { ChevronDown, Eye, Trash2, Search, Download, ChevronRight, ChevronLeft } from 'lucide-react';
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
      return 'bg-white text-gray-700 border border-gray-300';
    case 'Payment Approved':
      return 'bg-blue-50 text-blue-600 border border-blue-200';
    case 'Order Processing':
      return 'bg-orange-50 text-orange-600 border border-orange-200';
    case 'Order Shipping':
      return 'bg-green-50 text-green-600 border border-green-200';
    default:
      return 'bg-gray-100 text-gray-700 border border-gray-200';
  }
};

const getPaymentStatusColor = (status: PaymentStatus) => {
  switch (status) {
    case 'Paid':
      return 'bg-green-50 text-green-600 border border-green-200';
    case 'Unpaid':
      return 'bg-red-50 text-red-600 border border-red-200';
    default:
      return 'bg-gray-100 text-gray-700 border border-gray-200';
  }
};
const Order = () => {
  const [sortDropdown, setSortDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedView, setExpandedView] = useState(false);

  const toggleSort = (column: string) => {
    setSortDropdown(sortDropdown === column ? null : column);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Orders</h1>
        
        {/* Search and Export */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by product name or order number or PO"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <button className="bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-medium">
            <Download className="w-4 h-4" />
            Export orders
          </button>
        </div>

        {/* View Toggle */}
        <button
          onClick={() => setExpandedView(!expandedView)}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
        >
          {expandedView ? (
            <>
              <ChevronLeft className="w-4 h-4" />
              Show Less Columns
            </>
          ) : (
            <>
              Show All Columns
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 whitespace-nowrap">
                  Order ID
                </th>
                <th className="px-4 py-3 text-left whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-medium text-gray-600">Name</span>
                    <div className="relative">
                      <button
                        onClick={() => toggleSort('name')}
                        className="relative"
                      >
                        <ChevronDown className="w-3 h-3 text-gray-400" />
                      </button>
                      {sortDropdown === 'name' && (
                        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1 min-w-[140px]">
                          <button className="w-full px-3 py-2 text-left text-xs hover:bg-blue-600 hover:text-white text-gray-700">
                            Sort From A-Z
                          </button>
                          <button className="w-full px-3 py-2 text-left text-xs hover:bg-gray-100 text-gray-700">
                            Sort From Z-A
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </th>
                <th className="px-4 py-3 text-left whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-medium text-gray-600">Customer Type</span>
                    <button onClick={() => toggleSort('customerType')}>
                      <ChevronDown className="w-3 h-3 text-gray-400" />
                    </button>
                  </div>
                </th>
                <th className="px-4 py-3 text-left whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-medium text-gray-600">Date</span>
                    <button onClick={() => toggleSort('date')}>
                      <ChevronDown className="w-3 h-3 text-gray-400" />
                    </button>
                  </div>
                </th>
                <th className="px-4 py-3 text-left whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-medium text-gray-600">PO</span>
                    <button onClick={() => toggleSort('po')}>
                      <ChevronDown className="w-3 h-3 text-gray-400" />
                    </button>
                  </div>
                </th>
                
                {expandedView && (
                  <>
                    <th className="px-4 py-3 text-left whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-medium text-gray-600">Order Status</span>
                        <button onClick={() => toggleSort('orderStatus')}>
                          <ChevronDown className="w-3 h-3 text-gray-400" />
                        </button>
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 whitespace-nowrap">
                      Total
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 whitespace-nowrap">
                      Items
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 whitespace-nowrap">
                      Tracking Number
                    </th>
                    <th className="px-4 py-3 text-left whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-medium text-gray-600">Payment Status</span>
                        <button onClick={() => toggleSort('paymentStatus')}>
                          <ChevronDown className="w-3 h-3 text-gray-400" />
                        </button>
                      </div>
                    </th>
                  </>
                )}
                
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-xs text-gray-900 whitespace-nowrap">
                    {order.id}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-900 whitespace-nowrap">
                    {order.name}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-900 whitespace-nowrap">
                    {order.customerType}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-900 whitespace-nowrap">
                    {order.date}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-900 whitespace-nowrap">
                    {order.po}
                  </td>
                  
                  {expandedView && (
                    <>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`inline-block px-3 py-1 rounded-md text-xs font-medium ${getOrderStatusColor(
                            order.orderStatus
                          )}`}
                        >
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-900 whitespace-nowrap">
                        {order.total}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-900 whitespace-nowrap">
                        {order.items}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-900 whitespace-nowrap">
                        {order.trackingNumber}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`inline-block px-3 py-1 rounded-md text-xs font-medium ${getPaymentStatusColor(
                            order.paymentStatus
                          )}`}
                        >
                          {order.paymentStatus}
                        </span>
                      </td>
                    </>
                  )}
                  
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/orders/${order.id.replace('#', '')}`}
                        className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center hover:bg-green-100 transition-colors border border-green-200"
                      >
                        <Eye className="w-4 h-4 text-green-600" />
                      </Link>
                      <button className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center hover:bg-red-100 transition-colors border border-red-200">
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

export default Order;