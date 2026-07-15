import React, { useState } from "react";
import { Link } from "react-router";
import { Rate, Button, message } from "antd";
import { AiOutlineShoppingCart, AiOutlineCheck } from "react-icons/ai";
import type { Product } from "../../../types/ecommerce.types.ts";
import { useCart } from "../../../hooks/useCart.ts";

interface ProductCardProps {
  product: Product;
}

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=400&q=80";

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const [imageSrc, setImageSrc] = useState(product.thumbnail || FALLBACK_IMAGE);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) return;

    addItem(product, 1);
    setJustAdded(true);
    message.success(`${product.name} added to cart`);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col h-full">
      {/* Product Image Area with Badges */}
      <Link
        to={`/products/${product.id}`}
        className="relative block aspect-square bg-gray-50 overflow-hidden"
      >
        <img
          src={imageSrc}
          alt={product.name}
          onError={() => setImageSrc(FALLBACK_IMAGE)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.discountPercentage && product.discountPercentage > 0 ? (
            <span className="bg-red-500 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-xs">
              -{product.discountPercentage}%
            </span>
          ) : null}
          {!product.inStock && (
            <span className="bg-gray-800 text-white text-[11px] font-medium px-2 py-0.5 rounded shadow-xs">
              Out of Stock
            </span>
          )}
        </div>
      </Link>

      {/* Product Details Body */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Brand & Category info */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span className="uppercase tracking-wider font-semibold text-emerald-700">
              {product.brand}
            </span>
            <span className="capitalize">{product.subcategory || product.category}</span>
          </div>

          {/* Product Name */}
          <Link
            to={`/products/${product.id}`}
            className="font-medium text-sm text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug mb-2"
            title={product.name}
          >
            {product.name}
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-3">
            <Rate
              disabled
              allowHalf
              defaultValue={product.rating}
              style={{ fontSize: 13, color: "#f59e0b" }}
            />
            <span className="text-xs text-gray-400 font-medium">({product.reviewCount})</span>
          </div>
        </div>

        {/* Price & Add to Cart Action */}
        <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2 mt-auto">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <span className={`text-[11px] ${product.inStock ? "text-emerald-600" : "text-gray-400"}`}>
              {product.inStock ? `${product.stockCount} in stock` : "Unavailable"}
            </span>
          </div>

          <Button
            type={justAdded ? "default" : "primary"}
            size="small"
            disabled={!product.inStock}
            style={
              product.inStock && !justAdded
                ? { backgroundColor: "#059669", borderColor: "#059669" }
                : undefined
            }
            icon={justAdded ? <AiOutlineCheck /> : <AiOutlineShoppingCart />}
            onClick={handleAddToCart}
          >
            {justAdded ? "Added" : "Add"}
          </Button>
        </div>
      </div>
    </div>
  );
};

