'use client';

import React, { useState, useRef } from 'react';
import { FileText, Download, Plus, X } from 'lucide-react';

interface Specification {
  name: string;
  value: string;
}

interface UploadedImage {
  id: string;
  file: File;
  preview: string;
}

export default function AddProductPage() {
  const [specifications, setSpecifications] = useState<Specification[]>([
    { name: '', value: '' },
  ]);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addSpecification = () => {
    setSpecifications([...specifications, { name: '', value: '' }]);
  };

  const removeSpecification = (index: number) => {
    setSpecifications(specifications.filter((_, i) => i !== index));
  };

  const updateSpecification = (
    index: number,
    field: 'name' | 'value',
    value: string
  ) => {
    const updated = [...specifications];
    updated[index][field] = value;
    setSpecifications(updated);
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const remainingSlots = 4 - uploadedImages.length;
    const filesToAdd = Array.from(files).slice(0, remainingSlots);

    filesToAdd.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const newImage: UploadedImage = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            file,
            preview: reader.result as string,
          };
          setUploadedImages((prev) => [...prev, newImage]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const removeImage = (id: string) => {
    setUploadedImages((prev) => {
      const updated = prev.filter((img) => img.id !== id);
      // Clean up object URLs
      const removed = prev.find((img) => img.id === id);
      if (removed && removed.preview.startsWith('blob:')) {
        URL.revokeObjectURL(removed.preview);
      }
      return updated;
    });
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Add Product</h1>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
            <FileText className="w-4 h-4" />
            <span>Drafts</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
            <Download className="w-4 h-4" />
            <span>Import Products</span>
          </button>
        </div>
      </div>

      {/* Main Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-8">
        {/* Product Media Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Product Media</h2>
          
          {/* Image Upload Area */}
          {uploadedImages.length < 4 && (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={openFileDialog}
              className={`border-2 border-dashed rounded-lg p-12 flex flex-col items-center justify-center transition-colors cursor-pointer ${
                isDragging
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-blue-500'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                multiple
                onChange={handleFileInputChange}
                className="hidden"
              />
              <Plus className="w-16 h-16 text-gray-400 mb-4" />
              <p className="text-gray-600 text-center text-sm">
                Please upload a maximum of 4 images to showcase this product.
                <br />
                Ensure images are 800x800 pixels and in JPEG or PNG format.
              </p>
            </div>
          )}

          {/* Uploaded Images Grid */}
          {uploadedImages.length > 0 && (
            <div className="mt-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {uploadedImages.map((image) => (
                  <div
                    key={image.id}
                    className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200"
                  >
                    <img
                      src={image.preview}
                      alt="Product preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(image.id);
                      }}
                      className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {uploadedImages.length < 4 && (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={openFileDialog}
                    className={`border-2 border-dashed rounded-lg flex flex-col items-center justify-center transition-colors cursor-pointer aspect-square ${
                      isDragging
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-blue-500'
                    }`}
                  >
                    <Plus className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Product Information Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Product Information
          </h2>
          <div className="space-y-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter product name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category and Sub-category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select a category</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sub-category <span className="text-red-500">*</span>
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select a category</option>
                </select>
              </div>
            </div>

            {/* Brand */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand <span className="text-red-500">*</span>
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Select brand</option>
              </select>
            </div>

            {/* MPN and Vendor Part Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Manufacturer part number (MPN){' '}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter a manufacturer part number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vendor part number
                </label>
                <input
                  type="text"
                  placeholder="Enter a vendor part number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* UPC and GSA Contract Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Universal product code (UPC)
                </label>
                <input
                  type="text"
                  placeholder="Enter a universal product code"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GSA contract number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    defaultValue="GS-07F-1234X"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                  />
                  <select className="absolute right-2 top-1/2 transform -translate-y-1/2 border-none bg-transparent focus:outline-none">
                    <option></option>
                  </select>
                </div>
              </div>
            </div>

            {/* SKU/Custom Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SKU/Custom number
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="SKU_APP_0001">SKU_APP_0001</option>
              </select>
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short Description <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                placeholder="Enter a short description"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Pricing & Margins Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Pricing & Margins
          </h2>
          <div className="space-y-6">
            {/* Base Cost Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Base cost price <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="$XXX"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Sale Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sale price % <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="XXX%"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="w-32 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg flex items-center justify-center">
                  <span className="text-gray-600">$0.00</span>
                </div>
              </div>
            </div>

            {/* Promotional Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Promotional price %
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="XXX%"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="w-32 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg flex items-center justify-center">
                  <span className="text-gray-600">$0.00</span>
                </div>
              </div>
            </div>

            {/* Government Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Government price %
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="XXX%"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="w-32 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg flex items-center justify-center">
                  <span className="text-gray-600">$0.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Additional Information
          </h2>
          <div className="space-y-6">
            {/* Additional Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Description
              </label>
              <textarea
                rows={6}
                placeholder="Enter a full description"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Specifications */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Specifications
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="font-medium text-gray-700">Spec Name</div>
                  <div className="font-medium text-gray-700">Spec Value</div>
                </div>
                {specifications.map((spec, index) => (
                  <div key={index} className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Enter specification name"
                      value={spec.name}
                      onChange={(e) =>
                        updateSpecification(index, 'name', e.target.value)
                      }
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter specification value"
                        value={spec.value}
                        onChange={(e) =>
                          updateSpecification(index, 'value', e.target.value)
                        }
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {specifications.length > 1 && (
                        <button
                          onClick={() => removeSpecification(index)}
                          className="w-10 h-10 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <button
                  onClick={addSpecification}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  + Add new column
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
          <button className="px-6 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
            Save as Drafts
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Preview Product
          </button>
        </div>
      </div>
    </div>
  );
}

