'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function SignUpAccountType() {
  const [selectedType, setSelectedType] = useState<'personal' | 'government'>('personal');
  const router = useRouter();

  const handleContinue = () => {
    if (selectedType === 'personal') {
      router.push('/auth/signin/personal');
    } else {
      // Government/Institution path
      router.push('/auth/signin/government');
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-2xl font-bold">S</span>
          </div>
        </div>

        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
          Welcome Back!
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Please select the type of account you'd like to sign in as
        </p>

        {/* Account Type Selection */}
        <div className="space-y-4">
          {/* Personal Shopper Option */}
          <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
            style={{
              borderColor: selectedType === 'personal' ? '#2563eb' : '#e5e7eb',
              backgroundColor: selectedType === 'personal' ? '#eff6ff' : 'transparent'
            }}
          >
            <input
              type="radio"
              name="accountType"
              value="personal"
              checked={selectedType === 'personal'}
              onChange={() => setSelectedType('personal')}
              className="w-5 h-5 text-blue-600 cursor-pointer"
            />
            <div className="ml-4 flex-1">
              <h3 className="font-semibold text-gray-900">Commercial</h3>
              <p className="text-sm text-gray-600">
                For individuals buying for home or small office use
              </p>
            </div>
          </label>

          {/* Government / Institution Option */}
          <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
            style={{
              borderColor: selectedType === 'government' ? '#2563eb' : '#e5e7eb',
              backgroundColor: selectedType === 'government' ? '#eff6ff' : 'transparent'
            }}
          >
            <input
              type="radio"
              name="accountType"
              value="government"
              checked={selectedType === 'government'}
              onChange={() => setSelectedType('government')}
              className="w-5 h-5 text-blue-600 cursor-pointer"
            />
            <div className="ml-4 flex-1">
              <h3 className="font-semibold text-gray-900">Government / Institution</h3>
              <p className="text-sm text-gray-600">
                Access specialized pricing and invoice-based purchasing
              </p>
            </div>
          </label>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
        >
          Continue as {selectedType === 'personal' ? 'Commercial' : 'Government / Institution'}
        </button>
      </div>
    </div>
  );
}
