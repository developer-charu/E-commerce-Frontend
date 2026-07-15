import React from "react";
import { Card, Skeleton, Button, Empty } from "antd";
import { AiOutlineInbox } from "react-icons/ai";
import { ProductCard } from "./ProductCard.tsx";
import type { Product } from "../../../types/ecommerce.types.ts";

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  onClearFilters?: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading = false,
  onClearFilters,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <Card key={idx} className="rounded-xl border border-gray-200">
            <Skeleton.Image style={{ width: "100%", height: 200 }} active />
            <Skeleton active paragraph={{ rows: 2 }} className="mt-4" />
          </Card>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-2xs">
        <Empty
          image={<AiOutlineInbox size={64} className="text-gray-300 mx-auto mb-2" />}
          description={
            <div className="space-y-1">
              <p className="font-semibold text-gray-700 text-base">No products found</p>
              <p className="text-sm text-gray-500 max-w-sm mx-auto">
                No items match your active filter criteria. Try adjusting your search or clearing filters.
              </p>
            </div>
          }
        >
          {onClearFilters && (
            <Button
              type="primary"
              style={{ backgroundColor: "#059669", borderColor: "#059669" }}
              onClick={onClearFilters}
              className="mt-2"
            >
              Clear All Filters
            </Button>
          )}
        </Empty>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

