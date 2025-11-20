"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import SavedAddressCard from './SavedAddressCard';

interface SavedAddress {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phoneNumber: string;
  isPrimary?: boolean;
}

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

interface ContactDetailsProps {
  isExpanded: boolean;
  onToggle: () => void;
  formData: ContactDetailsFormData;
  onFormDataChange: (data: ContactDetailsFormData) => void;
  isCompleted: boolean;
}

export default function ContactDetails({
  isExpanded,
  onToggle,
  formData,
  onFormDataChange,
  isCompleted,
}: ContactDetailsProps) {
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([
    {
      id: '1',
      name: 'John Doe',
      address: '1234 E Colfax Avenue',
      city: 'Denver',
      state: 'CO',
      zipCode: '80218',
      country: 'US',
      phoneNumber: '(303) 555 - 7890',
      isPrimary: true,
    },
  ]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('1');
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(!isCompleted);

  // Initialize form data with default saved address
  React.useEffect(() => {
    if (selectedAddressId && !isCompleted && !showForm) {
      const address = savedAddresses.find(addr => addr.id === selectedAddressId);
      if (address && !formData.firstName) {
        onFormDataChange({
          ...formData,
          firstName: address.name,
          phoneNumber: address.phoneNumber,
          prefix: 'USA (+1)',
          shippingCountry: address.country,
          shippingAddress: address.address.split(',')[0],
          shippingCity: address.city,
          shippingState: address.state,
          shippingZipCode: address.zipCode,
        });
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFormDataChange({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveAddress = () => {
    const newAddress: SavedAddress = {
      id: Date.now().toString(),
      name: formData.firstName,
      address: `${formData.shippingAddress}${formData.shippingSuite ? ', ' + formData.shippingSuite : ''}`,
      city: formData.shippingCity,
      state: formData.shippingState,
      zipCode: formData.shippingZipCode,
      country: formData.shippingCountry,
      phoneNumber: formData.phoneNumber,
      isPrimary: formData.setAsPrimary,
    };

    setSavedAddresses([...savedAddresses, newAddress]);
    setSelectedAddressId(newAddress.id);
    setShowForm(false);
    onToggle();
  };

  const handleEditAddress = (id: string) => {
    const address = savedAddresses.find(addr => addr.id === id);
    if (address) {
      onFormDataChange({
        ...formData,
        firstName: address.name,
        shippingAddress: address.address.split(',')[0],
        shippingCity: address.city,
        shippingState: address.state,
        shippingZipCode: address.zipCode,
        shippingCountry: address.country,
        phoneNumber: address.phoneNumber,
      });
      setEditingAddressId(id);
      setShowForm(true);
    }
  };

  const handleDeleteAddress = (id: string) => {
    const updatedAddresses = savedAddresses.filter(addr => addr.id !== id);
    setSavedAddresses(updatedAddresses);
    
    // If deleted address was selected, select the first remaining address
    if (selectedAddressId === id && updatedAddresses.length > 0) {
      setSelectedAddressId(updatedAddresses[0].id);
    }
  };

  const handleSelectSavedAddress = (addressId: string) => {
    setSelectedAddressId(addressId);
    const address = savedAddresses.find(addr => addr.id === addressId);
    if (address) {
      // Update parent form data with selected address
      onFormDataChange({
        ...formData,
        firstName: address.name,
        phoneNumber: address.phoneNumber,
        prefix: 'USA (+1)', // Default prefix
        shippingCountry: address.country,
        shippingAddress: address.address.split(',')[0],
        shippingCity: address.city,
        shippingState: address.state,
        shippingZipCode: address.zipCode,
      });
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 mb-4">
      <div
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
      >
        <div className="flex flex-col items-start w-full">
          <h3 className="font-semibold text-gray-900 text-base">Contact Details</h3>
          
          {isCompleted && !showForm && savedAddresses.length > 0 && (
            <div className="mt-3 w-full">
              <p className="text-sm font-medium text-gray-700 mb-2">Shipping address</p>
              {selectedAddressId && savedAddresses.find(a => a.id === selectedAddressId) && (
                <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {savedAddresses.find(a => a.id === selectedAddressId)?.name}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {savedAddresses.find(a => a.id === selectedAddressId)?.address}, {savedAddresses.find(a => a.id === selectedAddressId)?.city}, {savedAddresses.find(a => a.id === selectedAddressId)?.state} {savedAddresses.find(a => a.id === selectedAddressId)?.zipCode}
                      </p>
                      <p className="text-sm text-gray-600">
                        {savedAddresses.find(a => a.id === selectedAddressId)?.phoneNumber}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowForm(true);
                      }}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium whitespace-nowrap"
                    >
                      Change
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-600" />
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="px-6 py-4 border-t border-gray-200 space-y-4">
          {/* Show saved addresses when not editing/adding */}
          {!showForm && savedAddresses.length > 0 && (
            <>
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-900">Shipping address</h4>
                {savedAddresses.map((address) => (
                  <SavedAddressCard
                    key={address.id}
                    address={address}
                    isSelected={selectedAddressId === address.id}
                    onSelect={handleSelectSavedAddress}
                    onEdit={handleEditAddress}
                    onDelete={handleDeleteAddress}
                  />
                ))}
              </div>

              {/* Add new address button */}
              <button
                onClick={() => {
                  setShowForm(true);
                  setEditingAddressId(null);
                  onFormDataChange({
                    ...formData,
                    firstName: '',
                    phoneNumber: '',
                    prefix: '',
                    shippingCountry: '',
                    shippingAddress: '',
                    shippingSuite: '',
                    shippingZipCode: '',
                    shippingState: '',
                    shippingCity: '',
                  });
                }}
                className="w-full py-2 border-2 border-dashed border-gray-300 text-blue-600 hover:text-blue-700 font-medium rounded-md transition-colors text-sm"
              >
                + Add a new address
              </button>

              {/* Save and continue button */}
              <div className="pt-2 border-t border-gray-200">
                <button
                  onClick={onToggle}
                  className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors"
                >
                  Save and continue
                </button>
              </div>
            </>
          )}

          {/* Show form when adding/editing address */}
          {showForm && (
            <>
              {/* Personal Information Section */}
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-4">
                  Personal Information
                </p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">
                        Prefix <span className="text-red-600">*</span>
                      </label>
                      <select
                        name="prefix"
                        value={formData.prefix}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 bg-white"
                      >
                        <option value="">Select prefix</option>
                        <option value="USA (+1)">USA (+1)</option>
                        <option value="CA (+1)">CA (+1)</option>
                        <option value="UK (+44)">UK (+44)</option>
                        <option value="AU (+61)">AU (+61)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">
                        Phone Number <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900"
                      />
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">This may be used to contact delivery</p>
                  </div>
                </div>
              </div>

              {/* Shipping Address Section */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm font-semibold text-gray-900 mb-4">
                  Shipping Address
                </p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Country <span className="text-red-600">*</span>
                    </label>
                    <select
                      name="shippingCountry"
                      value={formData.shippingCountry}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 bg-white"
                    >
                      <option value="">Select your country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Shipping Address <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="shippingAddress"
                      value={formData.shippingAddress}
                      onChange={handleChange}
                      placeholder="Enter your street address or P.O Box"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">
                        Suite, Floor (Optional)
                      </label>
                      <input
                        type="text"
                        name="shippingSuite"
                        value={formData.shippingSuite}
                        onChange={handleChange}
                        placeholder="Enter suite, apt, floor etc."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">
                        Zip Code <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="shippingZipCode"
                        value={formData.shippingZipCode}
                        onChange={handleChange}
                        placeholder="Enter your zip code"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">
                        State <span className="text-red-600">*</span>
                      </label>
                      <select
                        name="shippingState"
                        value={formData.shippingState}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 bg-white"
                      >
                        <option value="">Select a state</option>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">
                        City <span className="text-red-600">*</span>
                      </label>
                      <select
                        name="shippingCity"
                        value={formData.shippingCity}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 bg-white"
                      >
                        <option value="">Select a city</option>
                        <option value="NYC">New York City</option>
                        <option value="LA">Los Angeles</option>
                        <option value="CHI">Chicago</option>
                        <option value="HOU">Houston</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Checkbox Options */}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.setAsPrimary}
                    onChange={(e) => {
                      onFormDataChange({
                        ...formData,
                        setAsPrimary: e.target.checked,
                      });
                    }}
                    className="mt-1"
                  />
                  <span className="text-sm text-gray-700">
                    Set as my primary address
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.useAsBilling}
                    onChange={(e) => {
                      onFormDataChange({
                        ...formData,
                        useAsBilling: e.target.checked,
                      });
                    }}
                  />
                  <span className="text-sm text-gray-700">
                    Use as billing address
                  </span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <button
                  onClick={handleSaveAddress}
                  className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors"
                >
                  Save and continue
                </button>
                {editingAddressId && (
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setEditingAddressId(null);
                    }}
                    className="w-full px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
