"use client";

import React from 'react';

interface ProductGalleryProps {
  images: string[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [index, setIndex] = React.useState(0);

  return (
    <div className="flex gap-4">
      {/* Thumbnail strip on left */}
      <div className="flex flex-col gap-2">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-24 h-24 rounded-lg border-2 overflow-hidden transition-all ${
              i === index ? 'border-blue-600 shadow-md' : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <img src={img} alt={`thumb-${i}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Main product image */}
      <div className="flex-1 bg-gray-50 rounded-lg overflow-hidden h-96 flex items-center justify-center border border-gray-200">
        <img src={images[index]} alt={`product-${index}`} className="h-full w-full object-contain p-4" />
      </div>
    </div>
  );
}
