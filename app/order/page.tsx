'use client';

import { useState, useMemo, useEffect } from 'react';
import Header from '@/app/landing/components/Header';
import Footer from '@/app/landing/components/Footer';
import OrderTabs from '@/app/components/order/OrderTabs';
import OrderCard from '@/app/components/order/OrderCard';
import OrderFilters from '@/app/components/order/OrderFilters';
import EmptyState from '@/app/components/order/EmptyState';
import { mockOrders, getOngoingOrders, getCompletedOrders } from '@/lib/data/mockOrders';
import { getOrders } from '@/lib/utils/orderStorage';
import { Order } from '@/lib/types/Order';

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'ongoing' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('This month');
  const [allOrders, setAllOrders] = useState<Order[]>(mockOrders);

  // Load orders from localStorage on component mount
  useEffect(() => {
    const savedOrders = getOrders();
    setAllOrders([...savedOrders, ...mockOrders]);
  }, []);

  const filteredOrders = useMemo(() => {
    let orders = allOrders;

    // Filter by tab
    if (activeTab === 'ongoing') {
      orders = orders.filter(
        (order) => order.status === 'pending' || order.status === 'confirmed' || order.status === 'shipped'
      );
    } else if (activeTab === 'completed') {
      orders = orders.filter((order) => order.status === 'delivered' || order.status === 'cancelled');
    }

    // Filter by search query
    if (searchQuery) {
      orders = orders.filter(
        (order) =>
          order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.items.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    return orders;
  }, [activeTab, searchQuery, allOrders]);

  const ongoingCount = allOrders.filter(
    (order) => order.status === 'pending' || order.status === 'confirmed' || order.status === 'shipped'
  ).length;
  const completedCount = allOrders.filter(
    (order) => order.status === 'delivered' || order.status === 'cancelled'
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Banner */}
      <div
        className="relative h-[480px] bg-cover bg-right"
        style={{ backgroundImage: 'url(/order.png)', backgroundPosition: 'right center' }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-4">My Orders</h1>
            <p className="text-base text-gray-700">Track recent purchases and view new offers</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Tabs */}
          <OrderTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            allCount={allOrders.length}
            ongoingCount={ongoingCount}
            completedCount={completedCount}
          />

          {/* Filters */}
          <OrderFilters
            onSearchChange={setSearchQuery}
            onDateRangeChange={setDateRange}
          />

          {/* Orders List or Empty State */}
          {filteredOrders.length > 0 ? (
            <div>
              {filteredOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="You don't have any orders yet"
              description="Once you place an order, it will appear here so you can track every step"
            />
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
