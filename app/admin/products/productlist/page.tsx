'use client';

import React, { useState } from 'react';
import { Search, Plus, Eye, Edit2, Trash2, Star, Heart, ShoppingCart, X, ChevronLeft } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  image: string;
  manufacturerPartNumber: string;
  vendorPartNumber: string;
  universalProductCode: string;
  gsaContractNumber: string;
  category: string;
  price: string;
  totalPurchase: number;
  description: string;
  additionalDescription: string;
  features: string[];
  regularPrice: string;
  discountPrice: string;
  sellingPrice: string;
  specifications: { name: string; value: string }[];
  stockStatus: 'Active' | 'Inactive';
  rating: number;
  reviews: number;
}

const initialProducts: Product[] = Array(10).fill(null).map((_, idx) => ({
  id: `${idx + 1}`,
  name: 'SHARPIE Fine Point Markers Black',
  image: '/api/placeholder/80/80',
  manufacturerPartNumber: '#ITM-123456',
  vendorPartNumber: '#VND-123456',
  universalProductCode: '(12)45678900',
  gsaContractNumber: 'GS-07P-12344',
  category: 'Office Products',
  price: '$450',
  totalPurchase: 5,
  description: 'Make Your Mark That Lasts. The Sharpie Fine Point Permanent Markers Deliver Bold, Smooth Ink That Writes On Almost Any Surface.',
  additionalDescription: 'Make Your Mark That Lasts. The Sharpie Fine Point Permanent Markers Deliver Bold, Smooth Ink That Writes On Almost Any Surface. Fine Point And Plastic To Metal And Glass.',
  features: [
    'Fine Point For Precise, Detailed Writing',
    'Quick-Drying Ink Resists Smudging And Fading',
    'Writes On Paper, Plastic, Metal, And Glass',
    'Permanent, Waterproof Ink',
    'Pack Includes Black, Blue, Red, And Green'
  ],
  regularPrice: '$450',
  discountPrice: '$50',
  sellingPrice: '$500',
  specifications: [
    { name: 'Weight', value: 'Object' },
    { name: 'Color', value: 'Black' }
  ],
  stockStatus: 'Active',
  rating: 0,
  reviews: 0
}));

const ProductManagementSystem = () => {
  const [currentPage, setCurrentPage] = useState<'list' | 'full-list' | 'view' | 'edit'>('list');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('view');
  };

  const handleEditProduct = (product: Product | null = null) => {
    setSelectedProduct(product);
    setCurrentPage('edit');
  };

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedProduct) {
      setProducts(products.filter(p => p.id !== selectedProduct.id));
      setShowDeleteModal(false);
      setSelectedProduct(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage === 'list' && (
        <ProductListInitial
          products={products}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onShowMore={() => setCurrentPage('full-list')}
          onAddNew={() => handleEditProduct(null)}
        />
      )}
      {currentPage === 'full-list' && (
        <ProductListFull
          products={products}
          onViewProduct={handleViewProduct}
          onEditProduct={handleEditProduct}
          onDeleteProduct={handleDeleteClick}
          onAddNew={() => handleEditProduct(null)}
        />
      )}
      {currentPage === 'view' && selectedProduct && (
        <ViewProduct
          product={selectedProduct}
          onBack={() => setCurrentPage('full-list')}
          onEdit={() => handleEditProduct(selectedProduct)}
        />
      )}
      {currentPage === 'edit' && (
        <EditProduct
          product={selectedProduct}
          onSave={() => setCurrentPage('full-list')}
          onCancel={() => setCurrentPage('full-list')}
        />
      )}
      {showDeleteModal && selectedProduct && (
        <DeleteModal
          productName={selectedProduct.name}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
};

export default ProductManagementSystem;

function ProductListInitial({
  products,
  searchQuery,
  setSearchQuery,
  onShowMore,
  onAddNew
}: {
  products: Product[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onShowMore: () => void;
  onAddNew: () => void;
}) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Product List</h1>
      
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search by product name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
        <button 
          onClick={onAddNew}
          className="flex items-center gap-2 px-4 py-2.5 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
        >
          <Plus className="w-4 h-4" />
          Add New Product
        </button>
      </div>

      <button
        onClick={onShowMore}
        className="text-sm text-blue-600 hover:text-blue-700 font-medium mb-4"
      >
        Show All Columns →
      </button>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-white border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">Product name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">Manufacturer part number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">Vendor part number</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.slice(0, 9).map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{product.name}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{product.manufacturerPartNumber}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{product.vendorPartNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={onShowMore}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Show More Items
        </button>
      </div>
    </div>
  );
}

function ProductListFull({
  products,
  onViewProduct,
  onEditProduct,
  onDeleteProduct,
  onAddNew
}: {
  products: Product[];
  onViewProduct: (product: Product) => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (product: Product) => void;
  onAddNew: () => void;
}) {
  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Product List</h1>
        <button 
          onClick={onAddNew}
          className="flex items-center gap-2 px-4 py-2.5 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
        >
          <Plus className="w-4 h-4" />
          Add New Product
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-white border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 whitespace-nowrap">Image</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 whitespace-nowrap">Product name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 whitespace-nowrap">Manufacturer part number</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 whitespace-nowrap">Vendor part number</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 whitespace-nowrap">Universal product code</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 whitespace-nowrap">GSA contract number</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 whitespace-nowrap">Category</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 whitespace-nowrap">Price</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 whitespace-nowrap">Total purchase qty</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-4">
                  <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                </td>
                <td className="px-4 py-4 text-xs text-gray-900">{product.name}</td>
                <td className="px-4 py-4 text-xs text-gray-900">{product.manufacturerPartNumber}</td>
                <td className="px-4 py-4 text-xs text-gray-900">{product.vendorPartNumber}</td>
                <td className="px-4 py-4 text-xs text-gray-900">{product.universalProductCode}</td>
                <td className="px-4 py-4 text-xs text-gray-900">{product.gsaContractNumber}</td>
                <td className="px-4 py-4 text-xs text-gray-900">{product.category}</td>
                <td className="px-4 py-4 text-xs text-gray-900">{product.price}</td>
                <td className="px-4 py-4 text-xs text-gray-900 text-center">{product.totalPurchase}</td>
                <td className="px-4 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onViewProduct(product)}
                      className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEditProduct(product)}
                      className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteProduct(product)}
                      className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ViewProduct({
  product,
  onBack,
  onEdit
}: {
  product: Product;
  onBack: () => void;
  onEdit: () => void;
}) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specification' | 'reviews'>('description');

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="font-medium">View Product</span>
        </button>
        <button
          onClick={onEdit}
          className="flex items-center gap-2 px-4 py-2.5 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
        >
          <Edit2 className="w-4 h-4" />
          Edit Product
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white p-6 rounded-lg">
        <div>
          <div className="mb-4">
            <img src={product.image} alt={product.name} className="w-full max-w-md border rounded-lg mx-auto" />
          </div>
          <div className="flex gap-2 justify-center">
            {[1, 2, 3].map((i) => (
              <img key={i} src={product.image} alt="" className="w-16 h-16 border rounded cursor-pointer hover:border-blue-500 transition-colors" />
            ))}
            <button className="w-16 h-16 border-2 border-dashed rounded flex items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-400 transition-colors">
              <Plus className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div>
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h1>
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-sm text-gray-500">{product.reviews} rating (s)</span>
                <button className="text-sm text-blue-600 hover:text-blue-700">Add a review</button>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-4">{product.price}</div>
            </div>
            <button className="p-2 border rounded-lg hover:bg-gray-50 transition-colors">
              <Heart className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              -
            </button>
            <input 
              type="number" 
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-16 text-center border rounded-lg py-2" 
            />
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              +
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              <ShoppingCart className="w-5 h-5" />
              Add to cart
            </button>
          </div>

          <div className="border-t pt-6">
            <div className="flex gap-6 mb-4 border-b">
              <button 
                onClick={() => setActiveTab('description')}
                className={`pb-3 font-medium transition-colors ${activeTab === 'description' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Additional description
              </button>
              <button 
                onClick={() => setActiveTab('specification')}
                className={`pb-3 font-medium transition-colors ${activeTab === 'specification' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Specification
              </button>
              <button 
                onClick={() => setActiveTab('reviews')}
                className={`pb-3 font-medium transition-colors ${activeTab === 'reviews' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Reviews ({product.reviews})
              </button>
            </div>
            <div>
              {activeTab === 'description' && (
                <>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{product.additionalDescription}</p>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <span className="mr-2">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {activeTab === 'specification' && (
                <div className="space-y-2">
                  {product.specifications.map((spec, idx) => (
                    spec.name && (
                      <div key={idx} className="flex justify-between py-2 border-b">
                        <span className="text-sm font-medium text-gray-700">{spec.name}</span>
                        <span className="text-sm text-gray-600">{spec.value}</span>
                      </div>
                    )
                  ))}
                </div>
              )}
              {activeTab === 'reviews' && (
                <p className="text-sm text-gray-500">No reviews yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EditProduct({
  product,
  onSave,
  onCancel
}: {
  product: Product | null;
  onSave: () => void;
  onCancel: () => void;
}) {
  const isEditing = product !== null;
  const [formData, setFormData] = useState<Product>(
    product || {
      id: '',
      name: '',
      image: '/api/placeholder/80/80',
      manufacturerPartNumber: '',
      vendorPartNumber: '',
      universalProductCode: '',
      gsaContractNumber: '',
      category: 'Office Products',
      price: '',
      totalPurchase: 0,
      description: '',
      additionalDescription: '',
      features: [],
      regularPrice: '',
      discountPrice: '',
      sellingPrice: '',
      specifications: [{ name: '', value: '' }],
      stockStatus: 'Active',
      rating: 0,
      reviews: 0
    }
  );

  const [isActive, setIsActive] = useState(formData.stockStatus === 'Active');

  const addSpecification = () => {
    setFormData({
      ...formData,
      specifications: [...formData.specifications, { name: '', value: '' }]
    });
  };

  const removeSpecification = (index: number) => {
    setFormData({
      ...formData,
      specifications: formData.specifications.filter((_, idx) => idx !== index)
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{isEditing ? 'Edit' : 'Add New'} Product</h1>

      <div className="bg-white rounded-lg p-6 space-y-8">
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Product Media</h3>
          <div className="flex gap-4 mb-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative">
                <img src={formData.image} alt="" className="w-24 h-24 border rounded-lg object-cover" />
                <button className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600 transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            <button className="w-24 h-24 border-2 border-dashed rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-400 transition-colors">
              <Plus className="w-6 h-6" />
            </button>
          </div>
          <p className="text-xs text-gray-500">You need to add at least 4 images. Pay attention to the quality of the pictures you add.</p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Product Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">Product Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="SHARPIE Fine Point Markers Black"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">Category *</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full border border-gray-300 text-[#000000]/60 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Office Products</option>
                  <option>Electronics</option>
                  <option>Furniture</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">Sub Category *</label>
                <select className="w-full border border-gray-300 text-[#000000]/60 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Pens & Accessories</option>
                  <option>Markers</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">Brand *</label>
              <select className="w-full border border-gray-300 text-[#000000]/60 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Sharpie</option>
                <option>BIC</option>
                <option>Pilot</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">Product Description *</label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border border-gray-300 text-[#000000]/60 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter product description..."
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Pricing</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">Regular price *</label>
              <input
                type="text"
                value={formData.regularPrice}
                onChange={(e) => setFormData({ ...formData, regularPrice: e.target.value })}
                className="w-full border border-gray-300 text-[#000000]/60 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="$450"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">Discount price</label>
              <input
                type="text"
                value={formData.discountPrice}
                onChange={(e) => setFormData({ ...formData, discountPrice: e.target.value })}
                className="w-full border border-gray-300 text-[#000000]/60 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="$50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">Sellingprice (Government Price)</label>
              <input
                type="text"
                value={formData.sellingPrice}
                onChange={(e) => setFormData({ ...formData, sellingPrice: e.target.value })}
                className="w-full border border-gray-300 text-[#000000]/60 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="$500"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Additional Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">Additional Description</label>
              <textarea
                rows={4}
                value={formData.additionalDescription}
                onChange={(e) => setFormData({ ...formData, additionalDescription: e.target.value })}
                className="w-full border border-gray-300 text-[#000000]/60 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter additional description..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">Specifications</label>
              {formData.specifications.map((spec, idx) => (
                <div key={idx} className="grid grid-cols-2 gap-4 mb-3">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter specification name"
                      value={spec.name}
                      onChange={(e) => {
                        const newSpecs = [...formData.specifications];
                        newSpecs[idx].name = e.target.value;
                        setFormData({ ...formData, specifications: newSpecs });
                      }}
                      className="w-full border border-gray-300 text-[#000000]/60 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button 
                      onClick={() => removeSpecification(idx)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 hover:text-red-700 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter specification value"
                      value={spec.value}
                      onChange={(e) => {
                        const newSpecs = [...formData.specifications];
                        newSpecs[idx].value = e.target.value;
                        setFormData({ ...formData, specifications: newSpecs });
                      }}
                      className="w-full border border-gray-300 rounded-lg px-3 text-[#000000]/60 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button 
                      onClick={() => removeSpecification(idx)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 hover:text-red-700 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
              <button 
                onClick={addSpecification}
                className="text-blue-600 text-sm hover:text-blue-700 font-medium"
              >
                + Add new Specification
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">Status Toggle</label>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-700 font-medium">{isActive ? 'Active' : 'Inactive'}</span>
                <button
                  onClick={() => setIsActive(!isActive)}
                  className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
                    isActive ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isActive ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Save Product
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteModal({
  productName,
  onCancel,
  onConfirm
}: {
  productName: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Delete Product?</h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          You&apos;re about to permanently delete &quot;{productName}&quot;. This action can&apos;t be reversed. Only do this if you&apos;re absolutely sure you&apos;re doing the right thing.
        </p>
        <div className="flex gap-4">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}