"use client";

import React from 'react';
import { Trash2 } from 'lucide-react';

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

interface SavedAddressCardProps {
  address: SavedAddress;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function SavedAddressCard({
  address,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
}: SavedAddressCardProps) {
  return (
    <div className={`border rounded-lg p-4 mb-4 transition-colors ${
      isSelected 
        ? 'border-blue-500 bg-blue-50' 
        : 'border-gray-300 bg-white hover:border-gray-400'
    }`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(address.id)}
            className="mt-1 cursor-pointer"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h4 className="font-semibold text-gray-900">{address.name}</h4>
              {address.isPrimary && (
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  Primary address
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-1">
              {address.address}, {address.city}, {address.state} {address.zipCode}
            </p>
            <p className="text-sm text-gray-600">
              ({address.phoneNumber})
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 whitespace-nowrap">
          <button
            onClick={() => onEdit(address.id)}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(address.id)}
            className="text-red-600 hover:text-red-700 p-1"
            title="Delete address"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
