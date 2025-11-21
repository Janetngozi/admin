'use client';

import React, { useState } from 'react';
import { ChevronLeft, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Specification { name: string; value: string; }
interface UploadedImage { id: string; preview: string; }
interface Product {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  brand: string;
  mpn: string;
  vendorPartNumber: string;
  upc: string;
  gsaContractNumber: string;
  sku: string;
  shortDescription: string;
  baseCostPrice: string;
  salePrice: string;
  promotionalPrice: string;
  governmentPrice: string;
  additionalDescription: string;
  specifications: Specification[];
  images: UploadedImage[];
  createdAt: string;
  status: 'draft' | 'published';
}

// Sample drafts data - in production, this would come from your database/API
const sampleDrafts: Product[] = [
  {
    id: '1',
    name: 'SHARPIE Fine Point Markers Black',
    category: 'Office Products',
    subCategory: 'Binders',
    brand: 'Sharpie',
    mpn: 'MTM-123456',
    vendorPartNumber: '#VND-123456',
    upc: '123456789',
    gsaContractNumber: 'GS-07F-1234X',
    sku: 'SKU_APP_0001',
    shortDescription: 'Premium markers for all surfaces.',
    baseCostPrice: '$25',
    salePrice: '40%',
    promotionalPrice: '100%',
    governmentPrice: '100%',
    additionalDescription: 'Premium markers.',
    specifications: [{ name: 'Weight', value: '75g' }],
    images: [],
    createdAt: 'Dec 24, 2025 | 09:45 AM',
    status: 'draft'
  },
  {
    id: '2',
    name: 'SURARD NOTEBOOK Flexible Business 4 Supplies',
    category: 'Office Products',
    subCategory: 'Notebooks',
    brand: 'Surard',
    mpn: 'SRD-789',
    vendorPartNumber: '#VND-789',
    upc: '987654321',
    gsaContractNumber: 'GS-07F-5678X',
    sku: 'SKU_APP_0002',
    shortDescription: 'Professional notebook.',
    baseCostPrice: '$15',
    salePrice: '30%',
    promotionalPrice: '0%',
    governmentPrice: '25%',
    additionalDescription: 'Notebook.',
    specifications: [{ name: 'Pages', value: '200' }],
    images: [],
    createdAt: 'Dec 24, 2025 | 09:45 AM',
    status: 'draft'
  },
  {
    id: '3',
    name: 'Fellowes Wellness - Floor Mat Black',
    category: 'Office Products',
    subCategory: 'Furniture',
    brand: 'Fellowes',
    mpn: 'FLW-345',
    vendorPartNumber: '#VND-345',
    upc: '112233445',
    gsaContractNumber: 'GS-07F-9012X',
    sku: 'SKU_APP_0003',
    shortDescription: 'Ergonomic floor mat.',
    baseCostPrice: '$45',
    salePrice: '20%',
    promotionalPrice: '0%',
    governmentPrice: '15%',
    additionalDescription: 'Anti-fatigue mat.',
    specifications: [{ name: 'Size', value: '36x24 inches' }],
    images: [],
    createdAt: 'Dec 24, 2025 | 09:45 AM',
    status: 'draft'
  },
];

// Delete Confirmation Modal
function DeleteModal({ 
  title, 
  message, 
  confirmText = 'Delete', 
  onCancel, 
  onConfirm 
}: { 
  title: string; 
  message: string; 
  confirmText?: string; 
  onCancel: () => void; 
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-2 text-gray-900">{title}</h2>
        <p className="text-gray-600 text-sm mb-6">{message}</p>
        <div className="flex gap-3">
          <button 
            onClick={onCancel} 
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm} 
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const router = useRouter();
  const [drafts, setDrafts] = useState<Product[]>(sampleDrafts);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showClearAll, setShowClearAll] = useState(false);

  const handleDelete = (id: string) => {
    setDrafts(drafts.filter(d => d.id !== id));
    setDeleteId(null);
  };

  const handleClearAll = () => {
    setDrafts([]);
    setShowClearAll(false);
  };

  const handleEdit = (product: Product) => {
    // Navigate to edit page with product ID
    // You can pass product data via query params or state management
    router.push(`/admin/products/add?edit=${product.id}`);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/products/add">
            <ChevronLeft className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-900" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            Drafts <span className="text-gray-400">{drafts.length}</span>
          </h1>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowClearAll(true)} 
            className="px-4 py-2 border border-red-500 text-red-600 rounded-lg hover:bg-red-50 font-medium"
          >
            Clear all
          </button>
          <Link 
            href="/admin/products/add"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            + Add New Product
          </Link>
        </div>
      </div>

      {/* Drafts List */}
      <div className="space-y-4">
        {drafts.map(draft => (
          <div 
            key={draft.id} 
            className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-4"
          >
            {/* Product Image */}
            <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
              {draft.images[0] ? (
                <img 
                  src={draft.images[0].preview} 
                  className="max-h-full object-contain" 
                  alt={draft.name} 
                />
              ) : (
                <span className="text-xs text-gray-400">No image</span>
              )}
            </div>

            {/* Product Info */}
            <div className="flex-1">
              <p className="text-xs text-gray-500 mb-1">{draft.createdAt}</p>
              <h3 className="font-bold text-gray-900">{draft.name}</h3>
              <p className="text-sm text-gray-500">{draft.category}</p>
              <button 
                onClick={() => handleEdit(draft)} 
                className="mt-2 px-4 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
              >
                Edit Product
              </button>
            </div>

            {/* Delete Button */}
            <button 
              onClick={() => setDeleteId(draft.id)} 
              className="text-red-500 hover:bg-red-50 p-2 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ))}

        {/* Empty State */}
        {drafts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No drafts saved.</p>
            <Link 
              href="/admin/products/add"
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add New Product
            </Link>
          </div>
        )}
      </div>

      {/* Delete Single Draft Modal */}
      {deleteId && (
        <DeleteModal 
          title="Delete Draft?" 
          message="Are you sure you want to delete this draft? This action cannot be undone and all unsaved information will be lost."
          onCancel={() => setDeleteId(null)} 
          onConfirm={() => handleDelete(deleteId)} 
        />
      )}

      {/* Clear All Drafts Modal */}
      {showClearAll && (
        <DeleteModal 
          title="Clear All Drafts?" 
          message="This action will permanently delete all saved drafts. Other destining, Master or data can not be recoverable."
          confirmText="Clear All"
          onCancel={() => setShowClearAll(false)} 
          onConfirm={handleClearAll} 
        />
      )}
    </div>
  );
}