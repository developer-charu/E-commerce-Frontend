import React, { useState } from "react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=600&q=80";

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName }) => {
  const displayImages = images && images.length > 0 ? images : [FALLBACK_IMAGE];
  const [selectedImage, setSelectedImage] = useState<string>(displayImages[0]);

  return (
    <div className="flex flex-col-reverse sm:flex-row gap-4">
      {/* Thumbnails row / column */}
      {displayImages.length > 1 && (
        <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-y-auto sm:max-h-96 pr-1">
          {displayImages.map((img, idx) => {
            const isSelected = selectedImage === img;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImage(img)}
                className={`relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                  isSelected ? "border-emerald-600 ring-2 ring-emerald-100" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <img
                  src={img}
                  alt={`${productName} thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Main Preview Image */}
      <div className="flex-1 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-2xs aspect-square flex items-center justify-center p-4">
        <img
          src={selectedImage}
          alt={productName}
          onError={() => setSelectedImage(FALLBACK_IMAGE)}
          className="max-h-full max-w-full object-contain rounded-lg transition-transform duration-300 hover:scale-105"
        />
      </div>
    </div>
  );
};

