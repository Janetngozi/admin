import React from 'react';
import Dashboard from './component/dashboard';
import Order from './orders/[id]/order';

export default function AdminPage() {
  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <Dashboard />
      <Order />
    </div>
  );
}
    