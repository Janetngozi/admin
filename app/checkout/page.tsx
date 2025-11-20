"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/context/CartContext';
import { ordersApi } from '@/lib/api/client';
import Header from '@/app/landing/components/Header';
import Footer from '@/app/landing/components/Footer';
import ContactDetails from './components/ContactDetails';
import DeliveryDetails from './components/DeliveryDetails';
import ReviewAndPay from './components/ReviewAndPay';
import OrderSummary from './components/OrderSummary';

interface ContactDetailsFormData {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  prefix: string;
  shippingCountry: string;
  shippingAddress: string;
  shippingSuite: string;
  shippingZipCode: string;
  shippingState: string;
  shippingCity: string;
  setAsPrimary: boolean;
  useAsBilling: boolean;
}

interface DeliveryDetailsFormData {
  shippingMethod: 'standard' | 'express' | 'overnight';
}

const shippingCosts: Record<string, number> = {
  standard: 0,
  express: 25,
  overnight: 50,
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCart();
  
  const [expandedStep, setExpandedStep] = useState<'contact' | 'delivery' | 'payment'>('contact');
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [selectedCard, setSelectedCard] = useState('1');
  const [orderStatus, setOrderStatus] = useState<'idle' | 'success' | 'failed'>('idle');
  
  const [contactDetails, setContactDetails] = useState<ContactDetailsFormData>({
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    prefix: '',
    shippingCountry: '',
    shippingAddress: '',
    shippingSuite: '',
    shippingZipCode: '',
    shippingState: '',
    shippingCity: '',
    setAsPrimary: false,
    useAsBilling: false,
  });

  const [deliveryDetails, setDeliveryDetails] = useState<DeliveryDetailsFormData>({
    shippingMethod: 'standard',
  });

  const handleContactDetailsChange = (data: ContactDetailsFormData) => {
    setContactDetails(data);
  };

  const handleDeliveryDetailsChange = (data: DeliveryDetailsFormData) => {
    setDeliveryDetails(data);
  };

  const handleToggleStep = (step: 'contact' | 'delivery' | 'payment') => {
    if (expandedStep === step) {
      // Mark as completed when closing
      setCompletedSteps(new Set([...completedSteps, step]));
      
      // Open next step
      if (step === 'contact' && !completedSteps.has('delivery')) {
        setExpandedStep('delivery');
      } else if (step === 'delivery' && !completedSteps.has('payment')) {
        setExpandedStep('payment');
      }
    } else {
      setExpandedStep(step);
    }
  };

  const handlePlaceOrder = async () => {
    // Validate form data - check essential fields
    if (!contactDetails.firstName || !contactDetails.phoneNumber) {
      alert('Please fill in contact details (Name and Phone)');
      return;
    }

    if (!contactDetails.shippingAddress || !contactDetails.shippingCity || !contactDetails.shippingState || !contactDetails.shippingZipCode) {
      alert('Please fill in shipping address');
      return;
    }

    if (!deliveryDetails.shippingMethod) {
      alert('Please select a delivery method');
      return;
    }

    if (items.length === 0) {
      alert('Your cart is empty');
      return;
    }

    try {
      setOrderStatus('idle');
      
      // Create order via API
      const response = await ordersApi.create({
        items: items.map((item) => ({
          productId: item.productId || item.id,
          quantity: item.quantity,
        })),
        // TODO: Save address and use addressId
        // shippingAddressId: ...,
        // billingAddressId: ...,
      });

      if (response.success && response.data) {
        // Redirect to Stripe checkout
        if (response.data.checkoutUrl) {
          window.location.href = response.data.checkoutUrl;
        } else {
          setOrderStatus('success');
        }
      } else {
        setOrderStatus('failed');
      }
    } catch (error: any) {
      console.error('Order creation failed:', error);
      setOrderStatus('failed');
    }
  };

  const calculateTotal = () => {
    const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
    const shipping = shippingCosts[deliveryDetails.shippingMethod] || 0;
    const tax = subtotal * 0.1; // 10% tax
    return subtotal + shipping + tax;
  };

  // Redirect to cart if no items
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Add items to your cart to continue checkout</p>
            <Link
              href="/cart"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors inline-block"
            >
              Return to Cart
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section with Checkout Image - Matches Product Page Style */}
        <div
          className="relative h-80 bg-cover bg-right"
          style={{ backgroundImage: 'url(/chekout.png)', backgroundPosition: 'right center' }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg">Checkout</h1>
          </div>
        </div>

        {/* Main Checkout Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Form Steps */}
            <div className="lg:col-span-2">
              <ContactDetails
                isExpanded={expandedStep === 'contact'}
                onToggle={() => handleToggleStep('contact')}
                formData={contactDetails}
                onFormDataChange={handleContactDetailsChange}
                isCompleted={completedSteps.has('contact')}
              />

              <DeliveryDetails
                isExpanded={expandedStep === 'delivery'}
                onToggle={() => handleToggleStep('delivery')}
                formData={deliveryDetails}
                onFormDataChange={handleDeliveryDetailsChange}
                isCompleted={completedSteps.has('delivery')}
              />

              <ReviewAndPay
                isExpanded={expandedStep === 'payment'}
                onToggle={() => handleToggleStep('payment')}
                isCompleted={completedSteps.has('payment')}
                selectedCardId={selectedCard}
                onSelectCard={setSelectedCard}
                onPlaceOrder={handlePlaceOrder}
              />
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <OrderSummary
                shippingCost={shippingCosts[deliveryDetails.shippingMethod] || 0}
                taxRate={0.1}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Order Success Modal */}
      {orderStatus === 'success' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8 relative">
            <button
              onClick={() => {
                setOrderStatus('idle');
                clearCart();
                router.push('/order-confirmation');
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            <h2 className="text-center text-2xl font-semibold text-gray-900 mb-3">
              Order confirmed
            </h2>

            <p className="text-center text-gray-600 text-sm mb-8">
              We've sent a confirmation email to you with your order details.<br />
              You'll get updates as soon as your items ship.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setOrderStatus('idle');
                  clearCart();
                  router.push('/order');
                }}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Track order
              </button>
              <button
                onClick={() => {
                  setOrderStatus('idle');
                  clearCart();
                  router.push('/');
                }}
                className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                Keep shopping
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Failed Modal */}
      {orderStatus === 'failed' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8 relative">
            <button
              onClick={() => setOrderStatus('idle')}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            <h2 className="text-center text-2xl font-semibold text-gray-900 mb-3">
              We couldn't complete your order
            </h2>

            <p className="text-center text-gray-600 text-sm mb-8">
              Don't worry, nothing's been charged and your cart's waiting for you.<br />
              Double check your payment info and try again or pick another method
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setOrderStatus('idle')}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Change payment method
              </button>
              <button
                onClick={() => setOrderStatus('idle')}
                className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                Retry payment
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
