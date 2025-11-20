'use client';

import React, { useState } from 'react';
import { Check } from 'lucide-react';

type OrderStatus = 'processing' | 'shipping';

export default function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: orderId } = React.use(params);
  // You can get this from the order data or URL params
  const [orderStatus, setOrderStatus] = useState<OrderStatus>('processing');

  const getProgressBarColors = (status: OrderStatus) => {
    if (status === 'processing') {
      return [
        'bg-green-500', // Payment processed
        'bg-green-500', // Order confirmed
        'bg-orange-500', // Order processing (current)
        'bg-gray-200', // Order shipping (pending)
      ];
    } else {
      // shipping
      return [
        'bg-green-500', // Payment processed
        'bg-green-500', // Order confirmed
        'bg-green-500', // Order processing (completed)
        'bg-orange-500', // Order shipping (current)
      ];
    }
  };

  const getActionButtonText = (status: OrderStatus) => {
    if (status === 'processing') {
      return 'Begin Order Processing';
    } else {
      return 'Order Shipping';
    }
  };

  const progressColors = getProgressBarColors(orderStatus);
  const actionButtonText = getActionButtonText(orderStatus);

  return (
    <div className="space-y-6">
      {/* Order Details Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Details</h2>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <h3 className="text-2xl font-bold text-gray-900">STC-123456</h3>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              Paid
            </span>
            {orderStatus === 'processing' && (
              <span className="px-3 py-1 bg-white text-gray-900 border border-gray-300 rounded-full text-sm font-medium">
                Order Confirmed
              </span>
            )}
            {orderStatus === 'shipping' && (
              <button className="px-3 py-1 bg-green-50 text-green-700 border border-green-300 rounded-full text-sm font-medium hover:bg-green-100 transition-colors">
                Order Shipping
              </button>
            )}
          </div>
          {/* Refund Button - only show in processing state */}
          {orderStatus === 'processing' && (
            <button className="px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
              Refund
            </button>
          )}
        </div>
        <p className="text-gray-500 mb-6">Dec 15th, 2025 at 06:35 AM</p>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
          </div>
          <div className="flex gap-1">
            <div className={`flex-1 h-2 ${progressColors[0]} rounded-l-full`}></div>
            <div className={`flex-1 h-2 ${progressColors[1]}`}></div>
            <div className={`flex-1 h-2 ${progressColors[2]}`}></div>
            <div className={`flex-1 h-2 ${progressColors[3]} rounded-r-full`}></div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-600">
            <span>Payment processed</span>
            <span>Order confirmed</span>
            <span>{orderStatus === 'shipping' ? 'Order processed' : 'Order processing'}</span>
            <span>Order shipping</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Estimated shipping period: <span className="font-semibold text-gray-900">Dec 16th to Dec 19th, 2025</span>
          </p>
          {orderStatus === 'processing' && (
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => {
                setOrderStatus('shipping');
              }}
            >
              {actionButtonText}
            </button>
          )}
        </div>
      </div>

      {/* All Items Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">All Items</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Product name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { name: 'SHARPIE Fine Point Markers Black', quantity: 3, total: '$450' },
              ].map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-xs text-gray-500">Image</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    {item.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Timeline */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Order Timeline</h2>
        <div className="space-y-6">
          {/* Timeline Item - Completed */}
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-5 h-5 text-white" />
              </div>
              <div className="w-0.5 h-full bg-green-500 mt-2"></div>
            </div>
            <div className="flex-1 pb-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    Order created for 3 items
                  </h3>
                  <p className="text-sm text-gray-600">
                    Order initialized with 3 line items and awaiting approval
                  </p>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                  Dec 15th, 2025 at 06:35 AM
                </span>
              </div>
            </div>
          </div>

          {/* Timeline Item - Completed */}
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-5 h-5 text-white" />
              </div>
              <div className="w-0.5 h-full bg-green-500 mt-2"></div>
            </div>
            <div className="flex-1 pb-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    Order payment
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Payment of $904.50 confirmed via card transaction
                    TRN-69233.
                  </p>
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                    Paid
                  </span>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                  Dec 15th, 2025 at 06:35 AM
                </span>
              </div>
            </div>
          </div>

          {/* Timeline Item - Completed */}
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-5 h-5 text-white" />
              </div>
              <div className="w-0.5 h-full bg-green-500 mt-2"></div>
            </div>
            <div className="flex-1 pb-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    Proforma invoice issued
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Preliminary invoice P-INV-2025-1042 generated upon payment
                    confirmation, sent to customer email.
                  </p>
                  <button className="px-3 py-1 border border-blue-600 text-blue-600 rounded text-sm hover:bg-blue-50 transition-colors">
                    Download invoice
                  </button>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                  Dec 15th, 2025 at 06:35 AM
                </span>
              </div>
            </div>
          </div>

          {/* Timeline Item - Current */}
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-orange-500 rounded-full"></div>
              <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
            </div>
            <div className="flex-1 pb-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    Order confirmed
                  </h3>
                  <p className="text-sm text-gray-600">
                    Order has been verified by admin and is ready for
                    fulfillment
                  </p>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                  Dec 15th, 2025 at 06:35 AM
                </span>
              </div>
            </div>
          </div>

          {/* Timeline Item - Pending */}
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
            </div>
            <div className="flex-1 pb-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    Order processing
                  </h3>
                  <p className="text-sm text-gray-600">
                    Warehouse team notified - items queued for packaging.
                  </p>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                  Dec 15th, 2025 at 06:35 AM
                </span>
              </div>
            </div>
          </div>

          {/* Timeline Item - Pending */}
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
            </div>
            <div className="flex-1 pb-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    Order shipping
                  </h3>
                  <p className="text-sm text-gray-600">
                    Shipment dispatched via FedEx Ground. Tracking number
                    PDX-41720008 assigned.
                  </p>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                  Dec 15th, 2025 at 06:35 AM
                </span>
              </div>
            </div>
          </div>

          {/* Timeline Item - Pending */}
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    Final invoice issued
                  </h3>
                  <p className="text-sm text-gray-600">
                    Invoice INV-2025-1052 generated post-shipment with
                    confirmed charges.
                  </p>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                  Dec 15th, 2025 at 06:35 AM
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment and Customer Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Payment Information
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Mastercard</p>
                  <p className="text-sm text-gray-600">**** **** **** 6465</p>
                </div>
              </div>
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Cardholder Name</p>
              <p className="font-medium text-gray-900">John Doe</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Transaction ID</p>
              <p className="font-medium text-gray-900">TRN-69233.</p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 overflow-hidden">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
          <div className="space-y-3 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium text-gray-900">$1050</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium text-gray-900">$120</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax</span>
              <span className="font-medium text-gray-900">$0.00</span>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 -mx-6 -mb-6 mt-4">
            <div className="flex justify-between">
              <span className="font-bold text-white">Order total</span>
              <span className="font-bold text-white">$1170.00</span>
            </div>
          </div>
        </div>

        {/* Customer Details */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Customer Details
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Name</p>
              <p className="font-medium text-gray-900">John Doe</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium text-gray-900">Johndoe123@gmail.com</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone Number</p>
              <p className="font-medium text-gray-900">+1 (303) 555-7890</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Shipping Address</p>
              <div className="text-sm text-gray-900">
                <p>John Doe</p>
                <p>1234 E Colfax Avenue, Denver, CO, 80218</p>
                <p>United States</p>
                <p>(303) 555-7890</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Billing Address</p>
              <p className="font-medium text-gray-900">
                Same with shipping address
              </p>
            </div>
          </div>
        </div>

        {/* Delivery Details */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Delivery Details
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Delivery Window</p>
              <p className="font-medium text-gray-900">
                Delivery between 27 October and 29 October
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 text-xs">🚚</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Delivery Type</p>
                <p className="font-medium text-gray-900">Door delivery</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Delivery Cost</p>
              <p className="font-medium text-gray-900">$24.95</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

