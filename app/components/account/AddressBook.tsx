'use client';

import { useState } from 'react';
import { Edit2 } from 'lucide-react';

interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  label: string;
}

export default function AddressBook() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      name: 'John Doe',
      label: 'Primary address',
      street: '123 E Dodson Avenue',
      city: 'Denver',
      state: 'CO',
      zip: '80134',
      phone: '(555) 555-7890',
    },
    {
      id: '2',
      name: 'Jane Doe',
      label: 'Office',
      street: '456 E Business Blvd',
      city: 'Denver',
      state: 'CO',
      zip: '80135',
      phone: '(555) 555-7891',
    },
    {
      id: '3',
      name: 'John Doe',
      label: 'Warehouse',
      street: '789 E Storage Lane',
      city: 'Denver',
      state: 'CO',
      zip: '80136',
      phone: '(555) 555-7892',
    },
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Address | null>(null);

  const handleEdit = (address: Address) => {
    setEditingId(address.id);
    setEditData(address);
  };

  const handleSave = () => {
    if (editData) {
      setAddresses(addresses.map(addr => addr.id === editData.id ? editData : addr));
      setEditingId(null);
      setEditData(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editData) {
      setEditData({ ...editData, [name]: value });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Address Book</h2>

      <div className="space-y-4">
        {addresses.map((address) => (
          editingId === address.id && editData ? (
            // Edit Mode
            <div key={address.id} className="border border-gray-300 rounded-lg p-4 bg-white">
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-600">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-1 border border-gray-300 rounded text-sm text-gray-900"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600">Street Address</label>
                  <input
                    type="text"
                    name="street"
                    value={editData.street}
                    onChange={handleChange}
                    className="w-full px-3 py-1 border border-gray-300 rounded text-sm text-gray-900"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-medium text-gray-600">City</label>
                    <input
                      type="text"
                      name="city"
                      value={editData.city}
                      onChange={handleChange}
                      className="w-full px-3 py-1 border border-gray-300 rounded text-sm text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-600">State</label>
                    <input
                      type="text"
                      name="state"
                      value={editData.state}
                      onChange={handleChange}
                      className="w-full px-3 py-1 border border-gray-300 rounded text-sm text-gray-900"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600">ZIP</label>
                  <input
                    type="text"
                    name="zip"
                    value={editData.zip}
                    onChange={handleChange}
                    className="w-full px-3 py-1 border border-gray-300 rounded text-sm text-gray-900"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={editData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-1 border border-gray-300 rounded text-sm text-gray-900"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={handleSave}
                    className="flex-1 px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 px-3 py-1 border border-gray-300 text-gray-700 text-sm font-medium rounded hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // View Mode
            <div key={address.id} className="border border-gray-300 rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900 text-sm">{address.name}</h3>
                <span className="text-xs text-gray-600 bg-white px-2 py-1 rounded">{address.label}</span>
              </div>
              <div className="space-y-1 text-sm text-gray-700">
                <p>{address.street}</p>
                <p>{address.city}, {address.state} {address.zip}</p>
                <p>{address.phone}</p>
              </div>
              <button
                onClick={() => handleEdit(address)}
                className="mt-3 flex items-center gap-1 text-blue-600 hover:text-blue-700 text-xs font-medium"
              >
                <Edit2 className="w-3 h-3" />
                Edit
              </button>
            </div>
          )
        ))}
      </div>
    </div>
  );
}
