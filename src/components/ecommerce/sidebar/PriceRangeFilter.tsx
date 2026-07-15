import React from "react";
import { Slider, InputNumber } from "antd";

interface PriceRangeFilterProps {
  minPrice?: number;
  maxPrice?: number;
  maxRange?: number;
  onChange: (min?: number, max?: number) => void;
}

export const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  minPrice = 0,
  maxPrice = 4000,
  maxRange = 4000,
  onChange,
}) => {
  const currentMin = minPrice ?? 0;
  const currentMax = maxPrice ?? maxRange;

  const handleSliderChange = (values: number[]) => {
    onChange(values[0], values[1]);
  };

  const handleMinChange = (val: number | null) => {
    const newMin = val ?? 0;
    onChange(newMin, Math.max(newMin, currentMax));
  };

  const handleMaxChange = (val: number | null) => {
    const newMax = val ?? maxRange;
    onChange(Math.min(currentMin, newMax), newMax);
  };

  return (
    <div className="py-3 border-t border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">Price Range</h4>
        <span className="text-xs text-gray-500 font-medium">
          ${currentMin} - ${currentMax}
        </span>
      </div>

      <div className="px-1 mb-2">
        <Slider
          range
          min={0}
          max={maxRange}
          step={50}
          value={[currentMin, currentMax]}
          onChange={handleSliderChange}
        />
      </div>

      <div className="flex items-center gap-2">
        <div className="flex-1">
          <InputNumber
            size="small"
            min={0}
            max={currentMax}
            value={currentMin}
            onChange={handleMinChange}
            prefix="$"
            style={{ width: "100%" }}
          />
        </div>
        <span className="text-gray-400 text-xs">to</span>
        <div className="flex-1">
          <InputNumber
            size="small"
            min={currentMin}
            max={maxRange}
            value={currentMax}
            onChange={handleMaxChange}
            prefix="$"
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

