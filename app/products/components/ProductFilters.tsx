'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface ProductFiltersProps {
  filters: {
    categories: string[];
    priceRange: number[];
    brands: string[];
    writingType: string[];
    paperType: string[];
    color: string[];
    packSize: string[];
    availability: string[];
  };
  onFilterChange: (filterName: string, value: any) => void;
}

const OFFICE_PRODUCTS = [
  { id: 'binders', label: 'Binders & accessories' },
  { id: 'cash', label: 'Cash handling' },
  { id: 'envelopes', label: 'Envelopes & forms' },
  { id: 'filing', label: 'Filing supplies' },
  { id: 'labels', label: 'Labels & labelling systems' },
  { id: 'paper', label: 'Paper & pads' },
  { id: 'writing', label: 'Writing & correction' },
];

const BRANDS = [
  { id: 'avery', label: 'Avery' },
  { id: 'bic', label: 'BiC' },
  { id: 'duraclip', label: 'Duraclip' },
  { id: 'esselte', label: 'Esselte' },
  { id: 'fellowes', label: 'Fellowes' },
  { id: 'smead', label: 'Smead' },
  { id: 'staples', label: 'Staples' },
];

const WRITING_TYPES = [
  'Ballpoint',
  'Gel',
  'Rollerball',
  'Marker/Permanent',
  'Fountain/Calligraphy',
  'Highlighter',
];

const PAPER_TYPES = [
  'Copy paper',
  'Cardstock',
  'Recycled paper',
  'Glossy/Matte',
  'Colored paper',
  'Highlighter',
];

const ORGANIZATION_TYPES = [
  'File folders',
  'Binders',
  'Dividers',
  'Expanding files',
];

const ENVELOPE_TYPES = [
  'Business envelopes',
  'Padded envelopes',
  'Catalog envelopes',
  'Booklet envelopes',
  'Window envelopes',
];

const COLORS = [
  'Black',
  'Blue',
  'Red',
  'Green',
  'White',
  'Yellow',
  'Pink',
];

const PACK_SIZES = [
  'Single',
  '5-Pack',
  '10-Pack',
  '25-Pack',
  '50-Pack',
  '100-Pack',
];

const AVAILABILITY = [
  'In Stock',
  'Limited Stock',
  'Pre-order',
];

export default function ProductFilters({ filters, onFilterChange }: ProductFiltersProps) {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    'office-products': true,
    'price': true,
    'brand': true,
    'writing-type': false,
    'paper-type': false,
    'organization-type': false,
    'envelope-type': false,
    'color': false,
    'pack-size': false,
    'availability': false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="space-y-4">
      {/* Product Categories */}
      <div className="bg-white rounded-lg shadow">
        <button
          onClick={() => toggleSection('office-products')}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 rounded-lg"
        >
          <h3 className="font-bold text-base text-gray-800">Product categories</h3>
          {expandedSections['office-products'] ? (
            <ChevronDown className="w-5 h-5 text-gray-800" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-800" />
          )}
        </button>
        
        {expandedSections['office-products'] && (
          <div className="px-4 pb-4 space-y-2 border-t">
            {OFFICE_PRODUCTS.map((item) => (
              <div key={item.id}>
                <a 
                  href="#" 
                  className={`block text-sm py-1.5 ${item.id === 'binders' ? 'text-blue-600 hover:text-blue-700 font-medium' : 'text-gray-800 hover:text-gray-900'}`}
                >
                  {item.label}
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Technology Section */}
        <button
          onClick={() => toggleSection('technology')}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 border-t"
        >
          <h4 className="font-bold text-base text-gray-800">Technology</h4>
          {expandedSections['technology'] ? (
            <ChevronDown className="w-5 h-5 text-gray-800" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-800" />
          )}
        </button>

        {/* Facility & Breakdown Section */}
        <button
          onClick={() => toggleSection('facility')}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 border-t"
        >
          <h4 className="font-bold text-base text-gray-800">Facility & Breakdown</h4>
          {expandedSections['facility'] ? (
            <ChevronDown className="w-5 h-5 text-gray-800" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-800" />
          )}
        </button>

        {/* Furniture Section */}
        <button
          onClick={() => toggleSection('furniture')}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 border-t"
        >
          <h4 className="font-bold text-base text-gray-800">Furniture</h4>
          {expandedSections['furniture'] ? (
            <ChevronDown className="w-5 h-5 text-gray-800" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-800" />
          )}
        </button>
      </div>

      {/* Filter by Price */}
      <div className="bg-white rounded-lg shadow">
        <button
          onClick={() => toggleSection('price')}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 rounded-lg"
        >
          <h3 className="font-bold text-base text-gray-800">Filter by price</h3>
          {expandedSections['price'] ? (
            <ChevronDown className="w-5 h-5 text-gray-800" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-800" />
          )}
        </button>
        
        {expandedSections['price'] && (
          <div className="px-4 pb-4 space-y-3 border-t pt-4">
            <div className="flex items-center gap-2 text-sm text-gray-800">
              <span>$40.00 - $120.00</span>
            </div>
            <input
              type="range"
              min="0"
              max="1000"
              value={filters.priceRange[1]}
              onChange={(e) => onFilterChange('priceRange', [40, +e.target.value])}
              className="w-full accent-blue-500"
            />
          </div>
        )}
      </div>

      {/* Brand */}
      <div className="bg-white rounded-lg shadow">
        <button
          onClick={() => toggleSection('brand')}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 rounded-lg"
        >
          <h3 className="font-bold text-base text-gray-800">Brand</h3>
          {expandedSections['brand'] ? (
            <ChevronDown className="w-5 h-5 text-gray-800" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-800" />
          )}
        </button>
        
        {expandedSections['brand'] && (
          <div className="px-4 pb-4 border-t pt-4">
            <div className="mb-3">
              <input
                type="text"
                placeholder="Search"
                className="w-full px-3 py-2 border rounded-lg text-sm text-gray-800 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              {BRANDS.map((brand) => (
                <label key={brand.id} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(brand.id)}
                    onChange={(e) => {
                      const updated = e.target.checked
                        ? [...filters.brands, brand.id]
                        : filters.brands.filter((b) => b !== brand.id);
                      onFilterChange('brands', updated);
                    }}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-800">{brand.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Writing Type */}
      <div className="bg-white rounded-lg shadow">
        <button
          onClick={() => toggleSection('writing-type')}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 rounded-lg"
        >
          <h3 className="font-bold text-base text-gray-800">Writing type</h3>
          {expandedSections['writing-type'] ? (
            <ChevronDown className="w-5 h-5 text-gray-800" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-800" />
          )}
        </button>
        
        {expandedSections['writing-type'] && (
          <div className="px-4 pb-4 border-t pt-4 max-h-48 overflow-y-auto">
            <div className="space-y-2">
              {WRITING_TYPES.map((type) => (
                <label key={type} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-800">{type}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Paper Type */}
      <div className="bg-white rounded-lg shadow">
        <button
          onClick={() => toggleSection('paper-type')}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 rounded-lg"
        >
          <h3 className="font-bold text-base text-gray-800">Paper type</h3>
          {expandedSections['paper-type'] ? (
            <ChevronDown className="w-5 h-5 text-gray-800" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-800" />
          )}
        </button>
        
        {expandedSections['paper-type'] && (
          <div className="px-4 pb-4 border-t pt-4 max-h-48 overflow-y-auto">
            <div className="space-y-2">
              {PAPER_TYPES.map((type) => (
                <label key={type} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-800">{type}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Organization Type */}
      <div className="bg-white rounded-lg shadow">
        <button
          onClick={() => toggleSection('organization-type')}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 rounded-lg"
        >
          <h3 className="font-bold text-base text-gray-800">Organization type</h3>
          {expandedSections['organization-type'] ? (
            <ChevronDown className="w-5 h-5 text-gray-800" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-800" />
          )}
        </button>
        
        {expandedSections['organization-type'] && (
          <div className="px-4 pb-4 border-t pt-4 max-h-48 overflow-y-auto">
            <div className="space-y-2">
              {ORGANIZATION_TYPES.map((type) => (
                <label key={type} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-800">{type}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Envelope Type */}
      <div className="bg-white rounded-lg shadow">
        <button
          onClick={() => toggleSection('envelope-type')}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 rounded-lg"
        >
          <h3 className="font-bold text-base text-gray-800">Envelope type</h3>
          {expandedSections['envelope-type'] ? (
            <ChevronDown className="w-5 h-5 text-gray-800" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-800" />
          )}
        </button>
        
        {expandedSections['envelope-type'] && (
          <div className="px-4 pb-4 border-t pt-4 max-h-48 overflow-y-auto">
            <div className="space-y-2">
              {ENVELOPE_TYPES.map((type) => (
                <label key={type} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-800">{type}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Color */}
      <div className="bg-white rounded-lg shadow">
        <button
          onClick={() => toggleSection('color')}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 rounded-lg"
        >
          <h3 className="font-bold text-base text-gray-800">Color</h3>
          {expandedSections['color'] ? (
            <ChevronDown className="w-5 h-5 text-gray-800" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-800" />
          )}
        </button>
        
        {expandedSections['color'] && (
          <div className="px-4 pb-4 border-t pt-4 max-h-48 overflow-y-auto">
            <div className="space-y-2">
              {COLORS.map((color) => (
                <label key={color} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-800">{color}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Pack Size */}
      <div className="bg-white rounded-lg shadow">
        <button
          onClick={() => toggleSection('pack-size')}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 rounded-lg"
        >
          <h3 className="font-bold text-base text-gray-800">Pack size</h3>
          {expandedSections['pack-size'] ? (
            <ChevronDown className="w-5 h-5 text-gray-800" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-800" />
          )}
        </button>
        
        {expandedSections['pack-size'] && (
          <div className="px-4 pb-4 border-t pt-4 max-h-48 overflow-y-auto">
            <div className="space-y-2">
              {PACK_SIZES.map((size) => (
                <label key={size} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-800">{size}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Availability */}
      <div className="bg-white rounded-lg shadow">
        <button
          onClick={() => toggleSection('availability')}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 rounded-lg"
        >
          <h3 className="font-bold text-base text-gray-800">Availability</h3>
          {expandedSections['availability'] ? (
            <ChevronDown className="w-5 h-5 text-gray-800" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-800" />
          )}
        </button>
        
        {expandedSections['availability'] && (
          <div className="px-4 pb-4 border-t pt-4 max-h-48 overflow-y-auto">
            <div className="space-y-2">
              {AVAILABILITY.map((avail) => (
                <label key={avail} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-800">{avail}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
