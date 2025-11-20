'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/app/landing/components/Header';
import Footer from '@/app/landing/components/Footer';
import StatusBadge from '@/app/components/order/StatusBadge';
import { mockOrders } from '@/lib/data/mockOrders';
import { getOrders } from '@/lib/utils/orderStorage';
import { Order } from '@/lib/types/Order';

export default function OrderDetailPage() {
  const pathname = usePathname();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Extract ID from pathname: /order/[id]
    const orderId = pathname.split('/').pop();
    
    if (orderId) {
      const foundOrder = mockOrders.find((o) => o.id === orderId) || 
                         getOrders().find((o) => o.id === orderId);
      setOrder(foundOrder || null);
    }
    setLoading(false);
  }, [pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
            <p className="text-gray-600 mb-6">The order you're looking for doesn't exist.</p>
            <Link
              href="/order"
              className="inline-block px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Orders
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Order Header with Status and Actions */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Order {order.orderNumber}</h1>
              <p className="text-sm text-gray-600">Order on {order.createdDate} at 8:45 AM</p>
            </div>
            <div className="flex gap-3 items-center">
              <StatusBadge status={order.status} />
              {order.status === 'confirmed' && (
                <button className="px-4 py-2 border-2 border-red-500 text-red-500 rounded hover:bg-red-50 font-medium text-sm">
                  Cancel Order
                </button>
              )}
              <button className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded hover:bg-gray-50 font-medium text-sm">
                Contact Support
              </button>
            </div>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Order Items and Shipping Address */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items Box */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Item</h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    {/* Item Image */}
                    <div className="w-16 h-16 shrink-0 bg-gray-100 rounded overflow-hidden">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <span className="text-xs text-gray-500">No image</span>
                        </div>
                      )}
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm">{item.name}</h3>
                        <p className="text-xs text-gray-600">Qty: {item.qty}</p>
                      </div>
                      <span className="font-semibold text-gray-900">${item.price.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address Box */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h2>
              <div className="space-y-2 text-sm">
                <p className="font-semibold text-gray-900">JOHN Doe</p>
                <p className="text-gray-600">1234 E Collins Avenue, Denver, CO 80203</p>
                <p className="text-gray-600">(303) 555 - 7890</p>
                <div className="mt-3">
                  {order.status === 'confirmed' && (
                    <button className="px-4 py-2 bg-green-100 text-green-700 rounded text-sm font-medium hover:bg-green-200">
                      Order Confirmed
                    </button>
                  )}
                  {order.status === 'shipped' && (
                    <button className="px-4 py-2 bg-orange-100 text-orange-700 rounded text-sm font-medium hover:bg-orange-200">
                      Order Processing
                    </button>
                  )}
                  {order.status === 'delivered' && (
                    <button className="px-4 py-2 bg-green-100 text-green-700 rounded text-sm font-medium hover:bg-green-200">
                      Order Delivered
                    </button>
                  )}
                  {order.status === 'cancelled' && (
                    <button className="px-4 py-2 bg-red-100 text-red-700 rounded text-sm font-medium hover:bg-red-200">
                      Cancelled
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Your Review Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Review</h2>
              {order.status === 'cancelled' ? (
                <p className="text-gray-600 text-sm">This order was cancelled</p>
              ) : order.status === 'delivered' ? (
                <div className="space-y-3">
                  <p className="text-gray-600 text-sm">Please rate your experience</p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} className="text-2xl hover:scale-110 transition-transform">
                        ☆
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Leave a review"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                  <button className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700">
                    Post
                  </button>
                </div>
              ) : (
                <p className="text-gray-600 text-sm">This order is on it's way!</p>
              )}
            </div>
          </div>

          {/* Right Column - Order Summary and Timeline */}
          <div className="space-y-6">
            {/* Order Summary Box */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-3 pb-4 border-b border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Items Total (5)</span>
                  <span className="font-semibold text-gray-900">${order.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Discount</span>
                  <span className="font-semibold text-gray-900">-$50.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Sub total</span>
                  <span className="font-semibold text-gray-900">${(order.total - 50).toFixed(2)}</span>
                </div>
              </div>
              <div className="flex justify-between text-sm pt-4">
                <span className="font-semibold text-gray-900">Payment Method</span>
                <span className="text-gray-900">Credit Card</span>
              </div>
            </div>

            {/* Order Timeline Box */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Timeline</h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    <div className="w-0.5 h-8 bg-gray-300 my-1"></div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Order Confirmed</p>
                    <p className="text-xs text-gray-600">12 Oct | 09:45AM</p>
                  </div>
                </div>

                {order.status !== 'confirmed' && (
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-4 h-4 rounded-full ${order.status === 'shipped' || order.status === 'delivered' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <div className="w-0.5 h-8 bg-gray-300 my-1"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Order Processing</p>
                      <p className="text-xs text-gray-600">22 Oct | 09:45AM</p>
                    </div>
                  </div>
                )}

                {(order.status === 'shipped' || order.status === 'delivered') && (
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-4 h-4 rounded-full ${order.status === 'shipped' || order.status === 'delivered' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Order Shipped</p>
                      <p className="text-xs text-gray-600">22 Oct | 09:45AM</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Delivery Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Delivery Details</h2>
              <div className="space-y-3">
                <p className="text-sm text-gray-600">Delivery between 27 October and 23 October</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                      <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Door delivery</p>
                    <p className="text-xs text-gray-600">$24.85</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
