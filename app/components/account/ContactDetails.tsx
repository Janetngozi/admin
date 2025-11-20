'use client';

import { useState } from 'react';
import { Edit2 } from 'lucide-react';

interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export default function ContactDetails() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ContactInfo>({
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@gmail.com',
    phoneNumber: '+1 (555) 123-7890',
  });

  const [editData, setEditData] = useState<ContactInfo>(formData);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(formData);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setFormData(editData);
    setIsEditing(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Contact Details</h2>
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
        )}
      </div>

      <form className="space-y-4">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          <input
            type="text"
            name="firstName"
            value={isEditing ? editData.firstName : formData.firstName}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="John"
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors ${
              isEditing ? 'bg-white' : 'bg-gray-50 cursor-not-allowed text-gray-700'
            }`}
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={isEditing ? editData.lastName : formData.lastName}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Doe"
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors ${
              isEditing ? 'bg-white' : 'bg-gray-50 cursor-not-allowed text-gray-700'
            }`}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={isEditing ? editData.email : formData.email}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="johndoe@gmail.com"
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors ${
              isEditing ? 'bg-white' : 'bg-gray-50 cursor-not-allowed text-gray-700'
            }`}
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={isEditing ? editData.phoneNumber : formData.phoneNumber}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="+1 (555) 123-7890"
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors ${
              isEditing ? 'bg-white' : 'bg-gray-50 cursor-not-allowed text-gray-700'
            }`}
          />
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleSave}
              className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
