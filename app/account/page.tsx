'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/app/landing/components/Header';
import Footer from '@/app/landing/components/Footer';
import AccountSidebar from '@/app/components/account/AccountSidebar';
import ContactDetails from '@/app/components/account/ContactDetails';
import MyOrders from '@/app/components/account/MyOrders';
import MyWishlist from '@/app/components/account/MyWishlist';
import AddressBook from '@/app/components/account/AddressBook';
import MyMessages from '@/app/components/account/MyMessages';
import PaymentSettings from '@/app/components/account/PaymentSettings';
import NewsletterPreferences from '@/app/components/account/NewsletterPreferences';
import LoginSecurity from '@/app/components/account/LoginSecurity';

type ActiveTab = 'account' | 'orders' | 'wishlist' | 'addresses' | 'messages' | 'payment' | 'newsletter' | 'login';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('account');

  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return <ContactDetails />;
      case 'orders':
        return <MyOrders />;
      case 'wishlist':
        return <MyWishlist />;
      case 'addresses':
        return <AddressBook />;
      case 'messages':
        return <MyMessages />;
      case 'payment':
        return <PaymentSettings />;
      case 'newsletter':
        return <NewsletterPreferences />;
      case 'login':
        return <LoginSecurity />;
      default:
        return <ContactDetails />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      {/* Banner */}
      <div className="w-full flex justify-center">
        <div className="relative" style={{ height: '575px', width: '1440px', maxWidth: '100%' }}>
          <Image
            src="/account.png"
            alt="My Account banner"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-start pl-12">
            <h1 className="text-4xl font-bold text-white">My Account</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grow">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex gap-6">
            {/* Sidebar */}
            <div style={{ width: '493px', height: '650px' }}>
              <AccountSidebar activeTab={activeTab} onTabChange={setActiveTab} />
            </div>

            {/* Content Area */}
            <div style={{ width: '683px', height: '701px' }}>
              <div className="bg-white rounded-lg shadow border border-gray-300 p-6 h-full overflow-y-auto">
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
