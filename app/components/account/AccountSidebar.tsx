'use client';

import { User, ShoppingBag, Heart, MapPin, MessageSquare, CreditCard, Bell, Lock, LogOut } from 'lucide-react';

interface AccountSidebarProps {
  activeTab: string;
  onTabChange: (tab: any) => void;
}

const menuItems = [
  { id: 'account', label: 'My Account', icon: User },
  { id: 'orders', label: 'My Orders', icon: ShoppingBag },
  { id: 'wishlist', label: 'My Wishlist', icon: Heart },
  { id: 'addresses', label: 'Address book', icon: MapPin },
  { id: 'messages', label: 'My Messages', icon: MessageSquare },
  { id: 'payment', label: 'Payment settings', icon: CreditCard },
  { id: 'newsletter', label: 'Newsletter preferences', icon: Bell },
  { id: 'login', label: 'Login & Security', icon: Lock },
  { id: 'logout', label: 'Logout', icon: LogOut },
];

export default function AccountSidebar({ activeTab, onTabChange }: AccountSidebarProps) {
  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log('Logout clicked');
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-300 overflow-hidden h-full flex flex-col">
      <nav className="space-y-0 overflow-y-auto flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const isLogout = item.id === 'logout';

          return (
            <button
              key={item.id}
              onClick={() => {
                if (isLogout) {
                  handleLogout();
                } else {
                  onTabChange(item.id);
                }
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 border-l-4 border-b border-gray-200 transition-colors ${
                isActive
                  ? 'border-l-blue-600 bg-blue-50 text-blue-600'
                  : 'border-l-transparent text-gray-700 hover:bg-gray-50'
              } ${isLogout ? 'text-red-600 hover:bg-red-50' : ''}`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
