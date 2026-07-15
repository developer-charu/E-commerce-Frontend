import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { Pagination } from "antd";
import { EComLayoutComponent } from "../components/ecommerce/layout/EComLayoutComponent.tsx";
import { ProductSidebar } from "../components/ecommerce/sidebar/ProductSidebar.tsx";
import { ProductSorting } from "../components/ecommerce/product/ProductSorting.tsx";
import { ProductGrid } from "../components/ecommerce/product/ProductGrid.tsx";
import { MOCK_PRODUCTS } from "../mock/ecommerceMockData.ts";
import type {
  ProductFilterState,
  ProductSortOption,
} from "../types/ecommerce.types.ts";

const ITEMS_PER_PAGE = 6;

export const ProductListingPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // 1. Parse filter state from URL search params
  const filters: ProductFilterState = useMemo(() => {
    const brandsParam = searchParams.get("brands");
    return {
      category: searchParams.get("category") || undefined,
      subcategory: searchParams.get("subcategory") || undefined,
      minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
      maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
      brands: brandsParam ? brandsParam.split(",").filter(Boolean) : [],
      minRating: searchParams.get("minRating") ? Number(searchParams.get("minRating")) : undefined,
      inStockOnly: searchParams.get("inStockOnly") === "true",
      search: searchParams.get("search") || undefined,
    };
  }, [searchParams]);

  const currentSort = (searchParams.get("sort") as ProductSortOption) || "featured";
  const currentPage = Number(searchParams.get("page") || 1);

  // 2. Filter & Sort products based on URL parameters
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((prod) => {
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matchesName = prod.name.toLowerCase().includes(query);
        const matchesBrand = prod.brand.toLowerCase().includes(query);
        const matchesDesc = prod.shortDescription.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesDesc) return false;
      }

      if (filters.category && prod.category !== filters.category) {
        return false;
      }

      if (filters.subcategory && prod.subcategory !== filters.subcategory) {
        return false;
      }

      if (filters.brands && filters.brands.length > 0 && !filters.brands.includes(prod.brand)) {
        return false;
      }

      if (filters.minPrice !== undefined && prod.price < filters.minPrice) {
        return false;
      }

      if (filters.maxPrice !== undefined && prod.price > filters.maxPrice) {
        return false;
      }

      if (filters.minRating !== undefined && prod.rating < filters.minRating) {
        return false;
      }

      if (filters.inStockOnly && !prod.inStock) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (currentSort) {
      case "price_asc":
        return list.sort((a, b) => a.price - b.price);
      case "price_desc":
        return list.sort((a, b) => b.price - a.price);
      case "rating_desc":
        return list.sort((a, b) => b.rating - a.rating);
      case "newest":
        return list.sort((a, b) => b.id.localeCompare(a.id));
      case "featured":
      default:
        return list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }
  }, [filteredProducts, currentSort]);

  // Paginated slice
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedProducts, currentPage]);

  // 3. Handlers to sync state changes back to URL
  const updateURLParams = (updates: Record<string, string | null | undefined>) => {
    const nextParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "") {
        nextParams.delete(key);
      } else {
        nextParams.set(key, value);
      }
    });
    // Whenever a filter changes, reset to page 1
    if (!updates.page) {
      nextParams.delete("page");
    }
    setSearchParams(nextParams);
  };

  const handleFilterChange = (newFilters: Partial<ProductFilterState>) => {
    const updates: Record<string, string | null | undefined> = {};

    if ("category" in newFilters) updates.category = newFilters.category;
    if ("subcategory" in newFilters) updates.subcategory = newFilters.subcategory;
    if ("minPrice" in newFilters) updates.minPrice = newFilters.minPrice ? String(newFilters.minPrice) : null;
    if ("maxPrice" in newFilters) updates.maxPrice = newFilters.maxPrice && newFilters.maxPrice < 4000 ? String(newFilters.maxPrice) : null;
    if ("brands" in newFilters) {
      updates.brands = newFilters.brands && newFilters.brands.length > 0 ? newFilters.brands.join(",") : null;
    }
    if ("minRating" in newFilters) updates.minRating = newFilters.minRating ? String(newFilters.minRating) : null;
    if ("inStockOnly" in newFilters) updates.inStockOnly = newFilters.inStockOnly ? "true" : null;

    updateURLParams(updates);
  };

  const handleRemoveFilter = (key: keyof ProductFilterState, value?: string) => {
    if (key === "brands" && value) {
      const nextBrands = (filters.brands || []).filter((b) => b !== value);
      updateURLParams({ brands: nextBrands.length > 0 ? nextBrands.join(",") : null });
    } else {
      updateURLParams({ [key]: null });
    }
  };

  const handleResetFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  const handleSortChange = (sort: ProductSortOption) => {
    updateURLParams({ sort: sort === "featured" ? null : sort });
  };

  const handlePageChange = (page: number) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("page", String(page));
    setSearchParams(nextParams);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <EComLayoutComponent
      sidebar={
        <ProductSidebar
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          mobileDrawerOpen={mobileDrawerOpen}
          onCloseMobileDrawer={() => setMobileDrawerOpen(false)}
          totalProductsCount={sortedProducts.length}
        />
      }
    >
      <div>
        {/* Top bar with count, active filter tags, sort dropdown, and mobile filter toggle */}
        <ProductSorting
          totalCount={sortedProducts.length}
          currentSort={currentSort}
          onSortChange={handleSortChange}
          filters={filters}
          onRemoveFilter={handleRemoveFilter}
          onOpenMobileFilters={() => setMobileDrawerOpen(true)}
        />

        {/* Product Card Grid */}
        <ProductGrid
          products={paginatedProducts}
          onClearFilters={handleResetFilters}
        />

        {/* Pagination controls */}
        {sortedProducts.length > ITEMS_PER_PAGE && (
          <div className="flex justify-center mt-8 pt-4 border-t border-gray-200">
            <Pagination
              current={currentPage}
              total={sortedProducts.length}
              pageSize={ITEMS_PER_PAGE}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </div>
        )}
      </div>
    </EComLayoutComponent>
  );
};

export default ProductListingPage;
