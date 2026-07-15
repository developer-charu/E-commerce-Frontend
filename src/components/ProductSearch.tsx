import { AutoComplete, Input } from "antd";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { useDebounce } from "../hooks/useDebounce";

interface ProductSearchProps {
  onSearchSubmit?: (query: string) => void;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
}

const ProductSearch = ({
  onSearchSubmit,
  placeholder = "Search products, categories, brands...",
  className,
  style,
}: ProductSearchProps) => {
  const [value, setValue] = useState("");
  const { debounceValue } = useDebounce(value, 300);
  const navigate = useNavigate();

  // Derive options directly during render to prevent cascading renders
  const options = useMemo(() => {
    if (!debounceValue.trim()) {
      return [];
    }
    return [
      { value: debounceValue, label: `Search for "${debounceValue}"` },
      { value: `${debounceValue} in Electronics`, label: `"${debounceValue}" in Electronics` },
      { value: `${debounceValue} in Accessories`, label: `"${debounceValue}" in Accessories` },
    ];
  }, [debounceValue]);

  const handleSelect = (selectedValue: string) => {
    if (onSearchSubmit) {
      onSearchSubmit(selectedValue);
    } else {
      navigate(`/products?search=${encodeURIComponent(selectedValue)}`);
    }
  };

  const handleSearch = (val: string) => {
    setValue(val);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value.trim()) {
      handleSelect(value.trim());
    }
  };

  return (
    <AutoComplete
      className={className}
      style={{ width: "100%", maxWidth: 500, ...style }}
      value={value}
      options={options}
      onSelect={handleSelect}
      onChange={handleSearch}
    >
      <Input.Search
        placeholder={placeholder}
        onSearch={(val) => val.trim() && handleSelect(val.trim())}
        onKeyDown={handleKeyDown}
        allowClear
      />
    </AutoComplete>
  );
};

export default ProductSearch;
