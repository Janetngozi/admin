"use client";

import React from 'react';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import Header from '@/app/landing/components/Header';
import Footer from '@/app/landing/components/Footer';

export default function OrderConfirmationPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-4 py-16">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-green-100 p-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>

          {/* Message */}
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Thank You for Your Order!
            </h1>
            <p className="text-gray-600 mb-4">
              Your order has been successfully placed and is being processed.
            </p>
            <p className="text-gray-600 mb-8">
              You will receive a confirmation email shortly with your order details and tracking information.
            </p>

            {/* Order Details Placeholder */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
              <h3 className="font-semibold text-gray-900 mb-4">Order Details</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Order Number:</span>
                  <span className="font-semibold text-gray-900">#ORDER-2024-001</span>
                </div>
                <div className="flex justify-between">
                  <span>Order Date:</span>
                  <span className="font-semibold text-gray-900">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Delivery:</span>
                  <span className="font-semibold text-gray-900">5-7 Business Days</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-lg transition-colors"
              >
                Continue Shopping
              </Link>
              <Link
                href="/account/orders"
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                View My Orders
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
