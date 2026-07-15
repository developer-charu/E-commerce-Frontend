import React, { useState, useMemo } from "react";
import { Checkbox, Input } from "antd";
import type { CheckboxProps } from "antd";
import { AiOutlineSearch } from "react-icons/ai";
import { MOCK_BRANDS } from "../../../mock/ecommerceMockData.ts";

interface BrandFilterProps {
  selectedBrands: string[];
  onChange: (brands: string[]) => void;
}

export const BrandFilter: React.FC<BrandFilterProps> = ({ selectedBrands, onChange }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBrands = useMemo(() => {
    if (!searchTerm.trim()) return MOCK_BRANDS;
    return MOCK_BRANDS.filter((brand) =>
      brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleCheckboxChange = (brand: string, checked: boolean) => {
    if (checked) {
      onChange([...selectedBrands, brand]);
    } else {
      onChange(selectedBrands.filter((b) => b !== brand));
    }
  };

  return (
    <div className="py-3 border-t border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">Brands</h4>
        {selectedBrands.length > 0 && (
          <button
            type="button"
            className="text-xs text-emerald-600 hover:text-emerald-700 font-medium"
            onClick={() => onChange([])}
          >
            Clear ({selectedBrands.length})
          </button>
        )}
      </div>

      <div className="mb-2">
        <Input
          size="small"
          placeholder="Filter brands..."
          prefix={<AiOutlineSearch className="text-gray-400" size={14} />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          allowClear
        />
      </div>

      <div className="max-h-44 overflow-y-auto space-y-1.5 pr-1">
        {filteredBrands.map((brand) => {
          const isChecked = selectedBrands.includes(brand);
          const onCheckboxToggle: CheckboxProps["onChange"] = (e) => {
            handleCheckboxChange(brand, e.target.checked);
          };

          return (
            <div key={brand} className="flex items-center justify-between text-sm hover:bg-gray-50 px-1 py-0.5 rounded">
              <Checkbox checked={isChecked} onChange={onCheckboxToggle}>
                <span className={`text-xs ${isChecked ? "font-semibold text-gray-900" : "text-gray-700"}`}>
                  {brand}
                </span>
              </Checkbox>
            </div>
          );
        })}
        {filteredBrands.length === 0 && (
          <p className="text-xs text-gray-400 italic py-1">No brands found</p>
        )}
      </div>
    </div>
  );
};

