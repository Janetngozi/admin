"use client";

import React from 'react';

interface Product {
  id: string;
  description: string;
  specs?: string[][];
  reviews?: { id: string; author: string; rating: number; text: string }[];
}

export default function ProductTabs({ product }: { product: Product }) {
  const [active, setActive] = React.useState<'description' | 'specs' | 'reviews'>('description');

  const specs = product.specs || [];
  const reviews = product.reviews || [];

  return (
    <div>
      {/* Centered Tab Navigation */}
      <div className="border-b mb-8">
        <nav className="flex justify-center gap-12" aria-label="Tabs">
          <button
            onClick={() => setActive('description')}
            className={`py-3 text-base font-medium border-b-2 transition-colors ${
              active === 'description' ? 'text-black border-b-black' : 'text-gray-500 border-b-transparent hover:text-gray-700'
            }`}
          >
            Additional description
          </button>
          <button
            onClick={() => setActive('specs')}
            className={`py-3 text-base font-medium border-b-2 transition-colors ${
              active === 'specs' ? 'text-black border-b-black' : 'text-gray-500 border-b-transparent hover:text-gray-700'
            }`}
          >
            Specification
          </button>
          <button
            onClick={() => setActive('reviews')}
            className={`py-3 text-base font-medium border-b-2 transition-colors ${
              active === 'reviews' ? 'text-black border-b-black' : 'text-gray-500 border-b-transparent hover:text-gray-700'
            }`}
          >
            Reviews ({reviews.length})
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="max-w-3xl mx-auto">
        {active === 'description' && (
          <div className="text-gray-700 space-y-4">
            <p className="text-base leading-relaxed">{product.description}</p>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
              <li>Fine Point For Precise, Detailed Writing</li>
              <li>Quick-Drying Ink Resists Smudging And Fading</li>
              <li>Writes On Paper, Plastic, Metal, And Glass</li>
              <li>Permanent, Waterproof Ink</li>
              <li>Pack Includes Black, Blue, Red, And Green</li>
            </ul>
          </div>
        )}

        {active === 'specs' && (
          <div className="w-full">
            <table className="w-full border-collapse">
              <tbody>
                {specs.map((row, idx) => (
                  <tr key={row[0]} className={`border-b border-gray-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="py-4 px-6 font-medium text-gray-900 w-1/3 text-base">{row[0]}</td>
                    <td className="py-4 px-6 text-gray-700 text-base">{row[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {active === 'reviews' && (
          <div className="space-y-8 max-w-2xl">
            {/* Reviews List */}
            <div className="space-y-6">
              {reviews.length > 0 ? (
                reviews.map((r) => (
                  <div key={r.id} className="space-y-2">
                    {/* Author Name | Date and Rating */}
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900 text-base">{r.author}</span>
                      <span className="text-gray-400">|</span>
                      <span className="text-sm text-gray-500">4 months ago</span>
                    </div>
                    {/* Star Rating */}
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-lg ${i < r.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                          ★
                        </span>
                      ))}
                    </div>
                    {/* Review Text */}
                    <p className="text-sm text-gray-600 leading-relaxed">{r.text}</p>
                    {/* Separator */}
                    <div className="border-t border-gray-200 pt-4 mt-4"></div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-6">No reviews yet. Be the first to review!</p>
              )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-1 mb-8">
              <button className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                ‹
              </button>
              <button className="px-3 py-2 bg-blue-600 text-white rounded font-medium">1</button>
              <button className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">2</button>
              <button className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">3</button>
              <button className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">4</button>
              <button className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                ›
              </button>
            </div>

            {/* Your Review Section */}
            <div className="space-y-4">
              <h4 className="text-base font-semibold text-gray-900">Your Review</h4>
              
              {/* Star Rating Selection */}
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} className="text-3xl text-gray-300 hover:text-yellow-400 transition-colors">
                    ★
                  </button>
                ))}
              </div>

              {/* Comment Textarea */}
              <textarea
                className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-600"
                rows={5}
                placeholder="Leave a comment"
              />

              {/* Post Comment Button */}
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                Post comment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
