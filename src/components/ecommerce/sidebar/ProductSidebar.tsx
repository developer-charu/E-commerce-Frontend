import React from "react";
import { Drawer, Button, Switch, Rate } from "antd";
import { AiOutlineFilter, AiOutlineReload } from "react-icons/ai";
import { CategoryFilter } from "./CategoryFilter.tsx";
import { PriceRangeFilter } from "./PriceRangeFilter.tsx";
import { BrandFilter } from "./BrandFilter.tsx";
import type { ProductFilterState } from "../../../types/ecommerce.types.ts";

interface ProductSidebarProps {
  filters: ProductFilterState;
  onFilterChange: (newFilters: Partial<ProductFilterState>) => void;
  onResetFilters: () => void;
  /** Responsive mobile drawer controls */
  mobileDrawerOpen?: boolean;
  onCloseMobileDrawer?: () => void;
  totalProductsCount?: number;
}

export const ProductSidebar: React.FC<ProductSidebarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  mobileDrawerOpen = false,
  onCloseMobileDrawer,
  totalProductsCount,
}) => {
  const hasActiveFilters = Boolean(
    filters.category ||
    filters.subcategory ||
    (filters.minPrice !== undefined && filters.minPrice > 0) ||
    (filters.maxPrice !== undefined && filters.maxPrice < 4000) ||
    (filters.brands && filters.brands.length > 0) ||
    filters.minRating ||
    filters.inStockOnly ||
    filters.search
  );

  const sidebarContent = (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <AiOutlineFilter size={18} className="text-emerald-600" />
          <h3 className="font-semibold text-gray-900 text-sm">Filters</h3>
          {totalProductsCount !== undefined && (
            <span className="text-xs text-gray-500">({totalProductsCount} items)</span>
          )}
        </div>
        {hasActiveFilters && (
          <Button
            type="link"
            size="small"
            danger
            icon={<AiOutlineReload size={12} />}
            onClick={onResetFilters}
            style={{ padding: 0 }}
          >
            Reset
          </Button>
        )}
      </div>

      {/* 1. Category Tree */}
      <CategoryFilter
        selectedCategory={filters.category}
        selectedSubcategory={filters.subcategory}
        onSelectCategory={(cat, sub) =>
          onFilterChange({ category: cat, subcategory: sub })
        }
      />

      {/* 2. Price Range Filter */}
      <PriceRangeFilter
        minPrice={filters.minPrice}
        maxPrice={filters.maxPrice}
        onChange={(min, max) => onFilterChange({ minPrice: min, maxPrice: max })}
      />

      {/* 3. Brand Filter */}
      <BrandFilter
        selectedBrands={filters.brands || []}
        onChange={(brands) => onFilterChange({ brands })}
      />

      {/* 4. Customer Rating Filter */}
      <div className="py-3 border-t border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Rating
          </h4>
          {filters.minRating && (
            <button
              type="button"
              className="text-xs text-emerald-600 font-medium"
              onClick={() => onFilterChange({ minRating: undefined })}
            >
              Clear
            </button>
          )}
        </div>
        <div className="space-y-1">
          {[4, 3, 2].map((stars) => {
            const isSelected = filters.minRating === stars;
            return (
              <div
                key={stars}
                onClick={() =>
                  onFilterChange({ minRating: isSelected ? undefined : stars })
                }
                className={`flex items-center justify-between px-2 py-1 rounded cursor-pointer text-xs ${isSelected ? "bg-emerald-50 text-emerald-800 font-semibold" : "hover:bg-gray-50 text-gray-700"
                  }`}
              >
                <div className="flex items-center gap-1.5">
                  <Rate disabled defaultValue={stars} style={{ fontSize: 13 }} />
                  <span>& Up</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. In-Stock Availability Toggle */}
      <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
        <span className="text-xs font-medium text-gray-700">In Stock Only</span>
        <Switch
          size="small"
          checked={filters.inStockOnly}
          onChange={(checked) => onFilterChange({ inStockOnly: checked })}
        />
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-full">{sidebarContent}</div>

      {/* Mobile / Tablet Filter Drawer */}
      <Drawer
        title="Filter Products"
        placement="left"
        width={320}
        onClose={onCloseMobileDrawer}
        open={mobileDrawerOpen}
        footer={
          <div className="flex items-center justify-between gap-3">
            <Button block onClick={onResetFilters} disabled={!hasActiveFilters}>
              Reset All
            </Button>
            <Button
              type="primary"
              block
              style={{ backgroundColor: "#059669", borderColor: "#059669" }}
              onClick={onCloseMobileDrawer}
            >
              Show Results
            </Button>
          </div>
        }
      >
        {sidebarContent}
      </Drawer>
    </>
  );
};

