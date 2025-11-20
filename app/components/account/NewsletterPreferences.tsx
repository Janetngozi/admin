'use client';

import { useState } from 'react';

interface NewsletterPreference {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

export default function NewsletterPreferences() {
  const [subscriptionStatus, setSubscriptionStatus] = useState('You\'re subscribed to our newsletter');
  const [isUnsubscribeMessage, setIsUnsubscribeMessage] = useState(false);

  const [preferences, setPreferences] = useState<NewsletterPreference[]>([
    {
      id: 'product-updates',
      label: 'Product updates',
      description: 'Get the latest product information',
      enabled: true,
    },
    {
      id: 'deals-promotions',
      label: 'Deals & promotions',
      description: 'Exclusive offers and special promotions',
      enabled: true,
    },
    {
      id: 'furniture-office',
      label: 'Furniture & office gear',
      description: 'News on our furniture and office products',
      enabled: true,
    },
    {
      id: 'office-supplies',
      label: 'Office supplies',
      description: 'Updates on office supplies and stationery',
      enabled: true,
    },
    {
      id: 'facility-breakdown',
      label: 'Facility & breakdown',
      description: 'Information on facility services',
      enabled: true,
    },
    {
      id: 'tech-accessories',
      label: 'Tech & accessories',
      description: 'Latest tech products and accessories',
      enabled: true,
    },
  ]);

  const handleToggle = (id: string) => {
    setPreferences(preferences.map(pref =>
      pref.id === id ? { ...pref, enabled: !pref.enabled } : pref
    ));
  };

  const toggleAllPreferences = () => {
    const allEnabled = preferences.every(pref => pref.enabled);
    setPreferences(preferences.map(pref => ({
      ...pref,
      enabled: !allEnabled,
    })));
  };

  const handleUnsubscribe = () => {
    setSubscriptionStatus('You\'re unsubscribed from our newsletter');
    setIsUnsubscribeMessage(true);
    setPreferences(preferences.map(pref => ({ ...pref, enabled: false })));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Newsletter Preferences</h2>

      {/* Subscription Status */}
      <div className="mb-6">
        <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <span className={`font-medium ${isUnsubscribeMessage ? 'text-gray-700' : 'text-gray-700'}`}>
            Subscription status
          </span>
          <span className={`text-sm font-medium ${isUnsubscribeMessage ? 'text-gray-600' : 'text-orange-600'}`}>
            {isUnsubscribeMessage ? 'Unsubscribed' : 'Subscribed'}
          </span>
        </div>
      </div>

      {/* Email Topics Section */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 mb-4">Email topics</p>
        
        <div className="space-y-4">
          {preferences.map(pref => (
            <div key={pref.id} className="flex items-start justify-between p-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors">
              <div className="flex-1">
                <p className="font-medium text-gray-900">{pref.label}</p>
                <p className="text-sm text-gray-600 mt-1">{pref.description}</p>
              </div>
              
              {/* Toggle Switch */}
              <button
                onClick={() => handleToggle(pref.id)}
                className={`ml-4 shrink-0 relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  pref.enabled ? 'bg-green-500' : 'bg-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    pref.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <button
          onClick={toggleAllPreferences}
          className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          {preferences.every(p => p.enabled) ? 'Unsubscribe from all' : 'Subscribe to all'}
        </button>
        <button
          onClick={handleUnsubscribe}
          className="flex-1 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          Unsubscribe
        </button>
      </div>
    </div>
  );
}
