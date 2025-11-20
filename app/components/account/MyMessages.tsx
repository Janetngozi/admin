'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface Message {
  id: string;
  title: string;
  subject: string;
  date: string;
  isRead: boolean;
  details: string;
  actionLink?: string;
  actionText?: string;
}

export default function MyMessages() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const messages: Message[] = [
    {
      id: '1',
      title: 'Your order #SB-10284 has been shipped',
      subject: 'Order Shipped',
      date: 'Dec 3 at 10:03 AM',
      isRead: true,
      details: 'Great news! Your order has been shipped and is on its way to you. You can track your package using the tracking number provided below.',
      actionLink: '/order/1',
      actionText: 'Track Order',
    },
    {
      id: '2',
      title: 'Order #SB-10284 Confirmed',
      subject: 'Order Confirmed',
      date: 'Dec 1 at 2:15 PM',
      isRead: true,
      details: 'Thank you for your purchase! Your order has been confirmed and we\'re preparing it for shipment. You will receive another update once it ships.',
      actionLink: '/order/1',
      actionText: 'Track Order',
    },
    {
      id: '3',
      title: 'Updates: Slight delay with your order #SB-10284',
      subject: 'Order Update',
      date: 'Nov 29 at 8:45 AM',
      isRead: false,
      details: 'We wanted to inform you that your order may experience a slight delay in delivery. We apologize for any inconvenience and appreciate your patience.',
      actionLink: '/order/1',
      actionText: 'View Details',
    },
    {
      id: '4',
      title: 'Free Shipping This Week - Stock Up & Save',
      subject: 'Promotional',
      date: 'Nov 25 at 5:30 PM',
      isRead: false,
      details: 'Get free shipping on all orders over $100 this week only! Stock up on your favorite office supplies and save big.',
      actionLink: '/products',
      actionText: 'Shop Now',
    },
  ];

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Messages</h2>

      <div className="space-y-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-sm transition-shadow"
          >
            <button
              onClick={() => toggleExpand(message.id)}
              className={`w-full p-4 flex items-start justify-between ${
                expandedId === message.id ? 'bg-blue-50' : 'bg-white hover:bg-gray-50'
              } transition-colors`}
            >
              <div className="text-left flex-1">
                <p className={`text-sm ${message.isRead ? 'text-gray-700' : 'font-semibold text-gray-900'}`}>
                  {message.title}
                </p>
                <p className="text-xs text-gray-600 mt-1">{message.date}</p>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  expandedId === message.id ? 'rotate-180' : ''
                }`}
              />
            </button>

            {expandedId === message.id && (
              <div className="px-4 pb-4 bg-blue-50 border-t border-gray-200">
                <p className="text-sm text-gray-700 leading-relaxed mb-4">{message.details}</p>
                {message.actionText && (
                  <a
                    href={message.actionLink}
                    className="inline-block text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    {message.actionText} →
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
