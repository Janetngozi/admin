'use client';

import React, { useState } from 'react';
import { ChevronLeft, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function STECForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    agencyName: '',
    department: '',
    firstName: '',
    lastName: '',
    prefix: 'USA (+1)',
    phone: '',
    billingAddress: '',
    billingCountry: '',
    billingZipCode: '',
    billingState: '',
    billingCity: '',
    useSameAddress: false,
    shippingCountry: '',
    shippingAddress: '',
    shippingSuite: '',
    shippingZipCode: '',
    shippingState: '',
    shippingCity: '',
    setPrimary: false
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCreateAccount = () => {
    setShowSuccessModal(true);
    // After 3 seconds, redirect to signin
    setTimeout(() => {
      router.push('/auth/signin/government');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src="/STEC-logo 1.png" alt="STEC Logo" className="h-20 w-auto" />
        </div>

        <h1 className="text-2xl font-semibold text-center mb-3 text-gray-900">
          Tell us about your organization
        </h1>
        <p className="text-center text-sm text-gray-500 mb-8">
          This helps us set up your account for one-everything, purchase orders and<br />
          custom invoicing.
        </p>

        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentStep * 100}%)` }}
          >
            {/* Step 1: About Agency */}
            <div className="w-full shrink-0">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                {/* Progress */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-base font-semibold text-gray-900">About agency</h2>
                    <div className="flex gap-1.5">
                      <div className="w-8 h-1 bg-blue-600 rounded"></div>
                      <div className="w-8 h-1 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Agency Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">
                      Agency Name <span className="text-red-500">*</span>
                    </label>
                    <select 
                      className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.agencyName}
                      onChange={(e) => handleInputChange('agencyName', e.target.value)}
                    >
                      <option value="">Select your agency's name</option>
                      <option value="agency1">Agency 1</option>
                      <option value="agency2">Agency 2</option>
                    </select>
                  </div>

                  {/* Department Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">
                      Department Name <span className="text-red-500">*</span>
                    </label>
                    <select 
                      className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                    >
                      <option value="">Select your department's name</option>
                      <option value="dept1">Department 1</option>
                      <option value="dept2">Department 2</option>
                    </select>
                  </div>

                  {/* Contact Information */}
                  <div className="pt-4">
                    <h3 className="text-base font-semibold text-gray-900 mb-4">Contact information</h3>
                    
                    {/* First and Last Name */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-1.5">
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="text"
                          placeholder="Enter your first name"
                          className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-1.5">
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="text"
                          placeholder="Enter your last name"
                          className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Prefix and Phone */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-1.5">
                          Prefix <span className="text-red-500">*</span>
                        </label>
                        <select 
                          className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={formData.prefix}
                          onChange={(e) => handleInputChange('prefix', e.target.value)}
                        >
                          <option value="USA (+1)">USA (+1)</option>
                          <option value="UK (+44)">UK (+44)</option>
                          <option value="Canada (+1)">Canada (+1)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-1.5">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="tel"
                          placeholder="Enter your phone number"
                          className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Next Button */}
                <button 
                  onClick={handleNext}
                  className="w-full bg-blue-600 text-white py-3 rounded-md font-medium text-base hover:bg-blue-700 transition mt-8 shadow-sm"
                >
                  Next
                </button>
              </div>
            </div>

            {/* Step 2: Address Information */}
            <div className="w-full shrink-0 pl-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6 relative">
                {/* Back Button */}
                <button 
                  onClick={handleBack}
                  className="absolute top-6 left-6 text-gray-600 hover:text-gray-900 transition"
                >
                  <ChevronLeft size={24} />
                </button>

                {/* Progress */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-base font-semibold text-gray-900 ml-10">Add a new billing address</h2>
                    <div className="flex gap-1.5">
                      <div className="w-8 h-1 bg-gray-300 rounded"></div>
                      <div className="w-8 h-1 bg-blue-600 rounded"></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 max-h-96 overflow-y-auto pr-2">
                  {/* Billing Address Section */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-1.5">
                        Billing Address <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text"
                        placeholder="Enter your billing address"
                        className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.billingAddress}
                        onChange={(e) => handleInputChange('billingAddress', e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-1.5">
                          Country <span className="text-red-500">*</span>
                        </label>
                        <select 
                          className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={formData.billingCountry}
                          onChange={(e) => handleInputChange('billingCountry', e.target.value)}
                        >
                          <option value="">Select a country</option>
                          <option value="USA">USA</option>
                          <option value="Canada">Canada</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-1.5">
                          Zip Code <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="text"
                          placeholder="Enter your zip code"
                          className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={formData.billingZipCode}
                          onChange={(e) => handleInputChange('billingZipCode', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-1.5">
                          State <span className="text-red-500">*</span>
                        </label>
                        <select 
                          className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={formData.billingState}
                          onChange={(e) => handleInputChange('billingState', e.target.value)}
                        >
                          <option value="">Select a state</option>
                          <option value="CA">California</option>
                          <option value="NY">New York</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-1.5">
                          City <span className="text-red-500">*</span>
                        </label>
                        <select 
                          className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={formData.billingCity}
                          onChange={(e) => handleInputChange('billingCity', e.target.value)}
                        >
                          <option value="">Select a city</option>
                          <option value="city1">City 1</option>
                        </select>
                      </div>
                    </div>

                    <label className="flex items-center text-sm text-gray-700 cursor-pointer">
                      <input 
                        type="checkbox"
                        className="mr-2 w-4 h-4 rounded border-gray-300"
                        checked={formData.useSameAddress}
                        onChange={(e) => handleInputChange('useSameAddress', e.target.checked)}
                      />
                      Use as shipping address
                    </label>
                  </div>

                  {/* Shipping Address Section */}
                  <div className="space-y-4 pt-2">
                    <h3 className="text-base font-semibold text-gray-900">Add a new shipping address</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-1.5">
                        Country <span className="text-red-500">*</span>
                      </label>
                      <select 
                        className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.shippingCountry}
                        onChange={(e) => handleInputChange('shippingCountry', e.target.value)}
                      >
                        <option value="">Select your country</option>
                        <option value="USA">USA</option>
                        <option value="Canada">Canada</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-1.5">
                        Shipping Address <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text"
                        placeholder="Enter your street address or P.O Box"
                        className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.shippingAddress}
                        onChange={(e) => handleInputChange('shippingAddress', e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-1.5">
                          Suite, Floor (Optional)
                        </label>
                        <input 
                          type="text"
                          placeholder="Enter suite, apt, floor etc..."
                          className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={formData.shippingSuite}
                          onChange={(e) => handleInputChange('shippingSuite', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-1.5">
                          Zip Code <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="text"
                          placeholder="Enter your zip code"
                          className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={formData.shippingZipCode}
                          onChange={(e) => handleInputChange('shippingZipCode', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-1.5">
                          State <span className="text-red-500">*</span>
                        </label>
                        <select 
                          className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={formData.shippingState}
                          onChange={(e) => handleInputChange('shippingState', e.target.value)}
                        >
                          <option value="">Select a state</option>
                          <option value="CA">California</option>
                          <option value="NY">New York</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-1.5">
                          City <span className="text-red-500">*</span>
                        </label>
                        <select 
                          className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={formData.shippingCity}
                          onChange={(e) => handleInputChange('shippingCity', e.target.value)}
                        >
                          <option value="">Select a city</option>
                          <option value="city1">City 1</option>
                        </select>
                      </div>
                    </div>

                    <label className="flex items-center text-sm text-gray-700 cursor-pointer">
                      <input 
                        type="checkbox"
                        className="mr-2 w-4 h-4 rounded border-gray-300"
                        checked={formData.setPrimary}
                        onChange={(e) => handleInputChange('setPrimary', e.target.checked)}
                      />
                      Set as primary address
                    </label>
                  </div>
                </div>

                {/* Create Account Button */}
                <button 
                  onClick={handleCreateAccount}
                  className="w-full bg-blue-600 text-white py-3 rounded-md font-medium text-base hover:bg-blue-700 transition mt-6 shadow-sm"
                >
                  Create Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-8 text-center">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-blue-600" />
              </div>
            </div>

            {/* Success Message */}
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Sign Up Successful
            </h2>
            <p className="text-gray-600 text-sm mb-8">
              Your account is ready. Let's get you connected to an organized.
            </p>

            {/* Action Button */}
            <button
              onClick={() => router.push('/auth/signin/government')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 text-sm"
            >
              Go To Homepage
            </button>
          </div>
        </div>
      )}
    </div>
  );
}