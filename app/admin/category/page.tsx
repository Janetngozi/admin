'use client';

import React, { useState } from 'react';
import { Search, Plus, Eye, Edit2, Trash2 } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  subCategories: number;
  products: number;
  status: 'Active' | 'Inactive';
}

const initialCategories: Category[] = [
  {
    id: '1',
    name: 'Office Supplies',
    subCategories: 14,
    products: 127,
    status: 'Active'
  },
  {
    id: '2',
    name: 'Janitorial Supplies',
    subCategories: 14,
    products: 127,
    status: 'Active'
  },
  {
    id: '3',
    name: 'Office Furniture',
    subCategories: 14,
    products: 127,
    status: 'Active'
  },
  {
    id: '4',
    name: 'MRO Products',
    subCategories: 14,
    products: 127,
    status: 'Active'
  },
  {
    id: '5',
    name: 'Software Licenses',
    subCategories: 14,
    products: 127,
    status: 'Active'
  },
  {
    id: '6',
    name: 'Electronic Equipments',
    subCategories: 14,
    products: 127,
    status: 'Active'
  }
];

const CategoryManagementSystem = () => {
  const [currentView, setCurrentView] = useState<'list' | 'add-category' | 'add-subcategory'>('list');
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleAddCategory = () => {
    setCurrentView('add-category');
  };

  const handleAddSubCategory = () => {
    setCurrentView('add-subcategory');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === 'list' && (
        <CategoryList
          categories={categories}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onAddCategory={handleAddCategory}
          onAddSubCategory={handleAddSubCategory}
          onEdit={(category) => setSelectedCategory(category)}
        />
      )}
      {currentView === 'add-category' && (
        <AddCategory
          onSave={() => setCurrentView('list')}
          onCancel={() => setCurrentView('list')}
        />
      )}
      {currentView === 'add-subcategory' && (
        <AddSubCategory
          categories={categories}
          onSave={() => setCurrentView('list')}
          onCancel={() => setCurrentView('list')}
        />
      )}
    </div>
  );
};

export default CategoryManagementSystem;

function CategoryList({
  categories,
  searchQuery,
  setSearchQuery,
  onAddCategory,
  onAddSubCategory,
  onEdit
}: {
  categories: Category[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onAddCategory: () => void;
  onAddSubCategory: () => void;
  onEdit: (category: Category) => void;
}) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Category List</h1>

      <div className="flex items-center gap-4 mb-6">
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
          onClick={onAddCategory}
          className="flex items-center gap-2 px-4 py-2.5 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          Add New Category
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-white border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">Sub-categories</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600"># of products</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-900">{category.name}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{category.subCategories}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{category.products}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-green-50 text-green-600 border border-green-200">
                    {category.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEdit(category)}
                      className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={onAddSubCategory}
                      className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
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

function AddCategory({
  onSave,
  onCancel
}: {
  onSave: () => void;
  onCancel: () => void;
}) {
  const [categoryName, setCategoryName] = useState('');
  const [isActive, setIsActive] = useState(true);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Category</h1>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Category Details</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Name *
              </label>
              <input
                type="text"
                placeholder="Enter a category name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-2">
                Category name must not exceed 250 characters
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Status Toggle
            </label>
            <div className="flex items-start gap-3">
              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">Active</p>
                <p className="text-xs text-gray-500">
                  This category is currently live and products listed under it are available for purchase
                </p>
              </div>
              <button
                onClick={() => setIsActive(!isActive)}
                className={`relative inline-flex h-6 w-12 flex-shrink-0 items-center rounded-full transition-colors ${
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

          <button
            onClick={onSave}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Save Category
          </button>
        </div>
      </div>
    </div>
  );
}

function AddSubCategory({
  categories,
  onSave,
  onCancel
}: {
  categories: Category[];
  onSave: () => void;
  onCancel: () => void;
}) {
  const [subCategoryName, setSubCategoryName] = useState('');
  const [parentCategory, setParentCategory] = useState('');
  const [isActive, setIsActive] = useState(true);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Sub-Category</h1>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Sub-Category Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sub-Category Name *
                </label>
                <input
                  type="text"
                  placeholder="Enter a category name"
                  value={subCategoryName}
                  onChange={(e) => setSubCategoryName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Category name must not exceed 250 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Parent Category *
                </label>
                <select
                  value={parentCategory}
                  onChange={(e) => setParentCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.5rem center',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem'
                  }}
                >
                  <option value="">Select a parent category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Status Toggle
            </label>
            <div className="flex items-start gap-3">
              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">Active</p>
                <p className="text-xs text-gray-500">
                  This sub-category is currently live and products listed under it are available for purchase
                </p>
              </div>
              <button
                onClick={() => setIsActive(!isActive)}
                className={`relative inline-flex h-6 w-12 flex-shrink-0 items-center rounded-full transition-colors ${
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

          <button
            onClick={onSave}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Save Sub-Category
          </button>
        </div>
      </div>
    </div>
  );
}