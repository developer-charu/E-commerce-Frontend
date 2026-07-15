import React from "react";
import { ProductCard } from "./ProductCard.tsx";
import { MOCK_PRODUCTS } from "../../../mock/ecommerceMockData.ts";
import type { Product } from "../../../types/ecommerce.types.ts";

interface RelatedProductsProps {
  currentProduct: Product;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({ currentProduct }) => {
  const relatedList = MOCK_PRODUCTS.filter(
    (p) => p.id !== currentProduct.id && (p.category === currentProduct.category || p.brand === currentProduct.brand)
  ).slice(0, 4);

  if (relatedList.length === 0) return null;

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Related Products</h2>
          <p className="text-xs text-gray-500">Customers who viewed this item also looked at</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {relatedList.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

