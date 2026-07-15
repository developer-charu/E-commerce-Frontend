import React, { useState, useEffect } from "react";
import { Collapse } from "antd";
import type { CollapseProps } from "antd";
import { MOCK_CATEGORIES } from "../../../mock/ecommerceMockData.ts";

interface CategoryFilterProps {
  selectedCategory?: string;
  selectedSubcategory?: string;
  onSelectCategory: (categorySlug?: string, subcategorySlug?: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  selectedSubcategory,
  onSelectCategory,
}) => {
  const [activeKey, setActiveKey] = useState<string | string[] | undefined>(
    selectedCategory ? [selectedCategory] : undefined
  );

  useEffect(() => {
    if (selectedCategory) {
      setActiveKey(selectedCategory);
    } else {
      setActiveKey(undefined);
    }
  }, [selectedCategory]);

  const items: CollapseProps["items"] = MOCK_CATEGORIES.map((cat) => {
    const isCategorySelected = selectedCategory === cat.slug;
    const isCategoryActive = isCategorySelected && !selectedSubcategory;

    return {
      key: cat.slug,
      label: (
        <div
          className={`flex items-center justify-between w-full pr-1 text-sm transition-colors ${
            isCategoryActive
              ? "text-emerald-700 font-semibold"
              : isCategorySelected
              ? "text-emerald-600 font-medium"
              : "text-gray-700 hover:text-emerald-600"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onSelectCategory(cat.slug, undefined);
            setActiveKey(cat.slug);
          }}
        >
          <span>{cat.name}</span>
          {isCategorySelected && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-medium leading-none">
              Selected
            </span>
          )}
        </div>
      ),
      children: (
        <div className="space-y-1 pl-2 border-l-2 border-gray-100 ml-1 py-1">
          <button
            type="button"
            className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs cursor-pointer transition-colors ${
              isCategoryActive
                ? "bg-emerald-50 text-emerald-700 font-semibold"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
            onClick={() => onSelectCategory(cat.slug, undefined)}
          >
            All {cat.name}
          </button>
          {cat.subcategories.map((sub) => {
            const isSubSelected =
              isCategorySelected && selectedSubcategory === sub.slug;
            return (
              <button
                key={sub.id}
                type="button"
                className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs cursor-pointer transition-colors ${
                  isSubSelected
                    ? "bg-emerald-100 text-emerald-800 font-semibold"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
                onClick={() => onSelectCategory(cat.slug, sub.slug)}
              >
                {sub.name}
              </button>
            );
          })}
        </div>
      ),
    };
  });

  return (
    <div className="py-2">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">Categories</h4>
        {selectedCategory && (
          <button
            type="button"
            className="text-xs text-emerald-600 hover:text-emerald-700 font-medium cursor-pointer"
            onClick={() => onSelectCategory(undefined, undefined)}
          >
            All
          </button>
        )}
      </div>

      <Collapse
        accordion
        ghost
        size="small"
        activeKey={activeKey}
        onChange={(keys) => {
          const key = Array.isArray(keys) ? keys[0] : keys;
          setActiveKey(key);
        }}
        expandIconPosition="end"
        items={items}
      />
    </div>
  );
};

