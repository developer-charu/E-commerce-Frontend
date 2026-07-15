import React from "react";
import { Select, Tag, Button } from "antd";
import { AiOutlineFilter, AiOutlineClose } from "react-icons/ai";
import type { ProductSortOption, ProductFilterState } from "../../../types/ecommerce.types.ts";

interface ProductSortingProps {
  totalCount: number;
  currentSort: ProductSortOption;
  onSortChange: (sort: ProductSortOption) => void;
  filters: ProductFilterState;
  onRemoveFilter: (key: keyof ProductFilterState, value?: string) => void;
  onOpenMobileFilters: () => void;
}

export const ProductSorting: React.FC<ProductSortingProps> = ({
  totalCount,
  currentSort,
  onSortChange,
  filters,
  onRemoveFilter,
  onOpenMobileFilters,
}) => {
  const activeFilterCount =
    (filters.category ? 1 : 0) +
    (filters.subcategory ? 1 : 0) +
    (filters.brands ? filters.brands.length : 0) +
    (filters.minPrice ? 1 : 0) +
    (filters.maxPrice && filters.maxPrice < 4000 ? 1 : 0) +
    (filters.minRating ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0) +
    (filters.search ? 1 : 0);

  return (
    <div className="bg-white p-3.5 rounded-xl border border-gray-200 mb-5 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left: Product count & Mobile filter button */}
        <div className="flex items-center gap-3">
          <Button
            type="default"
            className="lg:hidden flex items-center gap-1.5"
            onClick={onOpenMobileFilters}
            icon={<AiOutlineFilter size={16} />}
          >
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 bg-emerald-600 text-white rounded-full text-xs flex items-center justify-center font-bold">
                {activeFilterCount}
              </span>
            )}
          </Button>

          <span className="text-sm text-gray-600 font-medium">
            Showing <strong className="text-gray-900">{totalCount}</strong> {totalCount === 1 ? "product" : "products"}
          </span>
        </div>

        {/* Right: Sorting Select */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 font-medium whitespace-nowrap">Sort by:</span>
          <Select<ProductSortOption>
            value={currentSort}
            onChange={onSortChange}
            style={{ width: 180 }}
            options={[
              { value: "featured", label: "Featured" },
              { value: "price_asc", label: "Price: Low to High" },
              { value: "price_desc", label: "Price: High to Low" },
              { value: "rating_desc", label: "Customer Rating" },
              { value: "newest", label: "Newest Arrivals" },
            ]}
          />
        </div>
      </div>

      {/* Active Filter Chips / Tags */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-3 mt-3 border-t border-gray-100">
          <span className="text-xs text-gray-400 mr-1">Active filters:</span>

          {filters.search && (
            <Tag
              closable
              closeIcon={<AiOutlineClose size={10} />}
              onClose={() => onRemoveFilter("search")}
              color="emerald"
            >
              Search: "{filters.search}"
            </Tag>
          )}

          {filters.category && (
            <Tag
              closable
              closeIcon={<AiOutlineClose size={10} />}
              onClose={() => onRemoveFilter("category")}
              color="blue"
            >
              Category: {filters.category}
            </Tag>
          )}

          {filters.subcategory && (
            <Tag
              closable
              closeIcon={<AiOutlineClose size={10} />}
              onClose={() => onRemoveFilter("subcategory")}
              color="cyan"
            >
              Sub: {filters.subcategory}
            </Tag>
          )}

          {filters.brands?.map((brand) => (
            <Tag
              key={brand}
              closable
              closeIcon={<AiOutlineClose size={10} />}
              onClose={() => onRemoveFilter("brands", brand)}
            >
              Brand: {brand}
            </Tag>
          ))}

          {(filters.minPrice || (filters.maxPrice && filters.maxPrice < 4000)) && (
            <Tag
              closable
              closeIcon={<AiOutlineClose size={10} />}
              onClose={() => onRemoveFilter("minPrice")}
            >
              Price: ${filters.minPrice || 0} - ${filters.maxPrice || 4000}
            </Tag>
          )}

          {filters.minRating && (
            <Tag
              closable
              closeIcon={<AiOutlineClose size={10} />}
              onClose={() => onRemoveFilter("minRating")}
            >
              Rating: {filters.minRating}★+
            </Tag>
          )}

          {filters.inStockOnly && (
            <Tag
              closable
              closeIcon={<AiOutlineClose size={10} />}
              onClose={() => onRemoveFilter("inStockOnly")}
            >
              In Stock Only
            </Tag>
          )}
        </div>
      )}
    </div>
  );
};

