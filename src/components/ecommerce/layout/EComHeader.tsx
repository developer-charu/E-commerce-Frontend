import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Badge,
  Dropdown,
  Drawer,
  Button,
  List,
  Typography,
} from "antd";
import type { MenuProps } from "antd";
import {
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineMenu,
  AiOutlineDelete,
  AiOutlineShop,
} from "react-icons/ai";
import ProductSearch from "../../ProductSearch.tsx";
import { useCart } from "../../../hooks/useCart.ts";
import { useRole } from "../../../hooks/useRole.ts";
import { getAuthorizedNavItems } from "../../../config/ecommerceNavigation.ts";

const { Text, Title } = Typography;

interface EComHeaderProps {
  onMobileNavToggle?: () => void;
}

export const EComHeader: React.FC<EComHeaderProps> = ({ onMobileNavToggle }) => {
  const { cart, removeItem, updateQuantity, clearCart } = useCart();
  const { role } = useRole();
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMobileNavClick = () => {
    if (onMobileNavToggle) {
      onMobileNavToggle();
    } else {
      setMobileMenuOpen(true);
    }
  };

  const authorizedNavItems = getAuthorizedNavItems(role);

  const userMenuItems: MenuProps["items"] = [
    {
      key: "user-info",
      disabled: true,
      label: (
        <div style={{ padding: "4px 0" }}>
          <Text strong>Mohit Tiwari</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>
            mohit@sigmagreens.com
          </Text>
        </div>
      ),
    },
    { type: "divider" },
    {
      key: "profile",
      label: <Link to="/account/profile">My Profile</Link>,
    },
    {
      key: "orders",
      label: <Link to="/account/orders">My Orders</Link>,
    },
    {
      key: "addresses",
      label: <Link to="/account/addresses">Saved Addresses</Link>,
    },
    { type: "divider" },
    {
      key: "signout",
      label: (
        <span
          style={{ color: "#ff4d4f" }}
          onClick={() => {
            // Placeholder auth action
          }}
        >
          Sign Out
        </span>
      ),
    },
  ];

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Left: Mobile Menu Toggle & Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 cursor-pointer"
              onClick={handleMobileNavClick}
              aria-label="Open navigation menu"
            >
              <AiOutlineMenu size={22} />
            </button>
            <Link to="/products" className="flex items-center gap-2">
              <span className="w-9 h-9 bg-emerald-600 text-white rounded-lg flex items-center justify-center font-bold text-lg shadow-sm">
                Σ
              </span>
              <span className="font-bold text-xl tracking-tight text-gray-900 hidden sm:inline-block">
                Sigma<span className="text-emerald-600">Store</span>
              </span>
            </Link>
          </div>

          {/* Center: Search UI */}
          <div className="flex-1 max-w-xl mx-2 hidden md:block">
            <ProductSearch
              placeholder="Search products, brands, or categories..."
              onSearchSubmit={(q) => navigate(`/products?search=${encodeURIComponent(q)}`)}
            />
          </div>

          {/* Right: Actions & User Profile */}
          <div className="flex items-center gap-1 sm:gap-4">
            {/* Shopping Cart with antd Badge and Button */}
            <Badge
              count={cart.totalQuantity}
              overflowCount={99}
              color="#059669"
            >
              <Button
                type="text"
                shape="circle"
                size="large"
                icon={<AiOutlineShoppingCart size={22} />}
                onClick={() => setCartDrawerOpen(true)}
                className="flex items-center justify-center text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                aria-label="View Shopping Cart"
              />
            </Badge>

            {/* User Profile Dropdown */}
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" trigger={["click"]}>
              <button
                type="button"
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-100 text-gray-700 cursor-pointer"
                aria-label="User account menu"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-medium">
                  <AiOutlineUser size={18} />
                </div>
              </button>
            </Dropdown>
          </div>
        </div>

        {/* Mobile Search Bar below header for small screens */}
        <div className="pb-3 md:hidden">
          <ProductSearch
            placeholder="Search products..."
            onSearchSubmit={(q) => navigate(`/products?search=${encodeURIComponent(q)}`)}
          />
        </div>
      </div>

      {/* Shopping Cart Drawer */}
      <Drawer
        title={
          <div className="flex items-center justify-between">
            <span className="font-semibold text-base">Shopping Cart ({cart.totalQuantity})</span>
            {cart.items.length > 0 && (
              <Button type="link" danger size="small" onClick={clearCart}>
                Clear
              </Button>
            )}
          </div>
        }
        placement="right"
        width={window.innerWidth < 480 ? "100%" : 400}
        onClose={() => setCartDrawerOpen(false)}
        open={cartDrawerOpen}
      >
        {cart.items.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <AiOutlineShop size={32} />
            </div>
            <Title level={5}>Your cart is empty</Title>
            <Text type="secondary">Explore our catalog and find something you love!</Text>
            <div className="mt-6">
              <Button
                type="primary"
                onClick={() => {
                  setCartDrawerOpen(false);
                  navigate("/products");
                }}
              >
                Browse Products
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full justify-between">
            <List
              className="overflow-y-auto flex-1 pr-1"
              itemLayout="horizontal"
              dataSource={cart.items}
              renderItem={(item) => (
                <List.Item
                  key={item.product.id}
                  actions={[
                    <button
                      key="del"
                      type="button"
                      className="text-gray-400 hover:text-red-500 p-1"
                      onClick={() => removeItem(item.product.id)}
                      aria-label="Remove item"
                    >
                      <AiOutlineDelete size={18} />
                    </button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <img
                        src={item.product.thumbnail}
                        alt={item.product.name}
                        className="w-14 h-14 object-cover rounded border border-gray-100"
                      />
                    }
                    title={
                      <Link
                        to={`/products/${item.product.id}`}
                        onClick={() => setCartDrawerOpen(false)}
                        className="text-sm font-medium line-clamp-1 hover:text-emerald-600"
                      >
                        {item.product.name}
                      </Link>
                    }
                    description={
                      <div className="mt-1">
                        <div className="font-semibold text-gray-900">${item.product.price.toFixed(2)}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            type="button"
                            className="w-6 h-6 border rounded flex items-center justify-center text-xs font-bold"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <span className="text-xs font-medium px-1">{item.quantity}</span>
                          <button
                            type="button"
                            className="w-6 h-6 border rounded flex items-center justify-center text-xs font-bold"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />

            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex justify-between text-base font-semibold mb-4">
                <span>Subtotal:</span>
                <span className="text-emerald-700">${cart.totalPrice.toFixed(2)}</span>
              </div>
              <Button
                type="primary"
                block
                size="large"
                style={{ backgroundColor: "#059669", borderColor: "#059669" }}
                onClick={() => {
                  setCartDrawerOpen(false);
                  navigate("/products");
                }}
              >
                Checkout (Demo)
              </Button>
            </div>
          </div>
        )}
      </Drawer>

      {/* Mobile Navigation Drawer */}
      <Drawer
        title="Menu & Navigation"
        placement="left"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        width={300}
      >
        <div className="mb-4">
          <Button
            type="primary"
            block
            icon={<AiOutlineShoppingCart size={18} />}
            style={{ backgroundColor: "#059669", borderColor: "#059669" }}
            onClick={() => {
              setMobileMenuOpen(false);
              setCartDrawerOpen(true);
            }}
            className="flex items-center justify-center gap-2 h-10 font-medium"
          >
            <span>View Cart ({cart.totalQuantity})</span>
          </Button>
        </div>

        <div className="flex flex-col space-y-1">
          {authorizedNavItems.map((item) => (
            <div key={item.key} className="py-1">
              <Link
                to={item.path}
                className="block px-3 py-2 rounded-md font-medium text-gray-700 hover:bg-gray-100 hover:text-emerald-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="pl-4 space-y-1 mt-1">
                  {item.children.map((sub) => (
                    <Link
                      key={sub.key}
                      to={sub.path}
                      className="block px-3 py-1.5 text-sm text-gray-500 hover:text-emerald-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Drawer>
    </header>
  );
};
