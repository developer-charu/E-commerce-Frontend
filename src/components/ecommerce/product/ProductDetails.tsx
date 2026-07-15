import React, { useState } from "react";
import { Rate, Button, Tabs, Tag, message } from "antd";
import {
  AiOutlineShoppingCart,
  AiOutlineCheck,
  AiOutlineSafetyCertificate,
  AiOutlineSync,
  AiOutlineCar,
} from "react-icons/ai";
import type { Product } from "../../../types/ecommerce.types.ts";
import { useCart } from "../../../hooks/useCart.ts";

interface ProductDetailsProps {
  product: Product;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addItem(product, quantity);
    setAdded(true);
    message.success(`${quantity}x ${product.name} added to your cart`);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => {
      const next = prev + delta;
      if (next < 1) return 1;
      if (next > (product.stockCount || 10)) return product.stockCount || 10;
      return next;
    });
  };

  const tabItems = [
    {
      key: "description",
      label: "Description",
      children: (
        <div className="prose max-w-none text-gray-700 text-sm leading-relaxed py-2">
          <p>{product.fullDescription || product.shortDescription}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {product.tags.map((tag) => (
              <Tag key={tag} color="default">
                #{tag}
              </Tag>
            ))}
          </div>
        </div>
      ),
    },
    {
      key: "specs",
      label: `Specifications (${product.specifications.length})`,
      children: (
        <div className="border border-gray-200 rounded-lg overflow-hidden my-2">
          <table className="w-full text-sm text-left">
            <tbody>
              {product.specifications.map((spec, idx) => (
                <tr
                  key={spec.key}
                  className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="px-4 py-2.5 font-medium text-gray-600 w-1/3 border-b border-gray-100">
                    {spec.key}
                  </td>
                  <td className="px-4 py-2.5 text-gray-900 border-b border-gray-100">
                    {spec.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
    },
    {
      key: "reviews",
      label: `Customer Reviews (${product.reviews.length})`,
      children: (
        <div className="py-2 space-y-4">
          {product.reviews.length === 0 ? (
            <p className="text-sm text-gray-500 italic">
              No reviews yet for this product. Be the first to share your thoughts!
            </p>
          ) : (
            product.reviews.map((rev) => (
              <div key={rev.id} className="border-b border-gray-100 pb-3">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-gray-900">{rev.author}</span>
                    {rev.verified && (
                      <span className="text-[11px] bg-emerald-50 text-emerald-700 font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                        <AiOutlineCheck size={10} /> Verified Purchase
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-400">{rev.date}</span>
                </div>
                <Rate disabled defaultValue={rev.rating} style={{ fontSize: 13, color: "#f59e0b" }} />
                <p className="text-sm text-gray-700 mt-1">{rev.comment}</p>
              </div>
            ))
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Brand & SKU */}
      <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
        <span className="uppercase font-bold tracking-wider text-emerald-700">{product.brand}</span>
        <span>SKU: {product.sku}</span>
      </div>

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-2">
        {product.name}
      </h1>

      {/* Rating & Reviews Count */}
      <div className="flex items-center gap-2 mb-4">
        <Rate disabled allowHalf defaultValue={product.rating} style={{ fontSize: 16, color: "#f59e0b" }} />
        <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
        <span className="text-xs text-gray-400">({product.reviewCount} customer reviews)</span>
      </div>

      {/* Price & Discounts */}
      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 mb-6">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-extrabold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <>
              <span className="text-base text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                Save ${(product.originalPrice - product.price).toFixed(2)} ({product.discountPercentage}%)
              </span>
            </>
          )}
        </div>

        {/* Stock Badge */}
        <div className="mt-2 flex items-center gap-2">
          <span
            className={`inline-block w-2.5 h-2.5 rounded-full ${
              product.inStock ? "bg-emerald-500" : "bg-red-500"
            }`}
          />
          <span className="text-xs font-semibold text-gray-700">
            {product.inStock ? `In Stock (${product.stockCount} units available)` : "Out of Stock"}
          </span>
        </div>
      </div>

      {/* Short Description */}
      <p className="text-sm text-gray-600 leading-relaxed mb-6">
        {product.shortDescription}
      </p>

      {/* Purchase Controls */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700">Quantity:</span>
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
            <button
              type="button"
              disabled={quantity <= 1 || !product.inStock}
              onClick={() => handleQuantityChange(-1)}
              className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 disabled:opacity-40 font-bold"
            >
              -
            </button>
            <span className="px-4 py-1.5 text-sm font-semibold text-gray-900">
              {quantity}
            </span>
            <button
              type="button"
              disabled={quantity >= (product.stockCount || 10) || !product.inStock}
              onClick={() => handleQuantityChange(1)}
              className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 disabled:opacity-40 font-bold"
            >
              +
            </button>
          </div>
          <span className="text-xs text-gray-400">
            Subtotal: ${(product.price * quantity).toFixed(2)}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="primary"
            size="large"
            disabled={!product.inStock}
            style={
              product.inStock
                ? { backgroundColor: "#059669", borderColor: "#059669" }
                : undefined
            }
            icon={added ? <AiOutlineCheck /> : <AiOutlineShoppingCart />}
            onClick={handleAddToCart}
            className="flex-1"
          >
            {added ? "Added to Cart" : "Add to Cart"}
          </Button>

          <Button
            size="large"
            disabled={!product.inStock}
            onClick={handleAddToCart}
            className="flex-1"
          >
            Buy Now
          </Button>
        </div>
      </div>

      {/* Assurance badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-white rounded-lg border border-gray-200 text-xs text-gray-600 mb-6">
        <div className="flex items-center gap-2">
          <AiOutlineCar size={20} className="text-emerald-600" />
          <span>Free Express Delivery</span>
        </div>
        <div className="flex items-center gap-2">
          <AiOutlineSafetyCertificate size={20} className="text-emerald-600" />
          <span>2-Year Warranty</span>
        </div>
        <div className="flex items-center gap-2">
          <AiOutlineSync size={20} className="text-emerald-600" />
          <span>30-Day Easy Returns</span>
        </div>
      </div>

      {/* Tabs for Description, Specifications, Reviews */}
      <Tabs defaultActiveKey="description" items={tabItems} />
    </div>
  );
};

