import React from "react";
import { Link, useLocation } from "react-router";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import { AiOutlineDown } from "react-icons/ai";
import { useRole } from "../../../hooks/useRole.ts";
import { getAuthorizedNavItems } from "../../../config/ecommerceNavigation.ts";
import { MOCK_CATEGORIES } from "../../../mock/ecommerceMockData.ts";

export const EComNavbar: React.FC = () => {
  const { role } = useRole();
  const location = useLocation();

  const authorizedNavItems = getAuthorizedNavItems(role);

  // Group role-specific inventory/management items for the navbar bar
  const managementNav = authorizedNavItems.find((item) => item.key === "inventory-group");

  const categoryMenuItems: MenuProps["items"] = MOCK_CATEGORIES.map((cat) => ({
    key: cat.id,
    label: (
      <Link to={`/products?category=${cat.slug}`} className="font-medium">
        {cat.name}
      </Link>
    ),
    children: cat.subcategories.map((sub) => ({
      key: sub.id,
      label: <Link to={`/products?category=${cat.slug}&subcategory=${sub.slug}`}>{sub.name}</Link>,
    })),
  }));

  return (
    <nav className="w-full bg-slate-900 text-white text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-11">
          {/* Left Category Nav & Links */}
          <div className="flex items-center space-x-6 overflow-x-auto py-1 scrollbar-none">
            {/* Category Mega/Dropdown Trigger */}
            <Dropdown menu={{ items: categoryMenuItems }} placement="bottomLeft">
              <button
                type="button"
                className="flex items-center gap-1.5 py-1 px-2.5 rounded-sm bg-slate-800 text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer"
              >
                <span>All Categories</span>
                <AiOutlineDown size={12} />
              </button>
            </Dropdown>

            {/* Quick Category Badges */}
            {MOCK_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.slug}`}
                className={`whitespace-nowrap hover:text-emerald-400 transition-colors font-medium text-xs sm:text-sm ${
                  location.search.includes(`category=${cat.slug}`) ? "text-emerald-400" : "text-slate-300"
                }`}
              >
                {cat.name}
              </Link>
            ))}

            <Link
              to="/products"
              className="text-slate-300 hover:text-emerald-400 whitespace-nowrap text-xs sm:text-sm"
            >
              All Products
            </Link>
          </div>

          {/* Right Role-driven navigation shortcuts for SALES and ADMIN */}
          {managementNav && (
            <div className="hidden md:flex items-center space-x-4 pl-4 border-l border-slate-700">
              <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                {role} Mode:
              </span>
              <div className="flex items-center space-x-3 text-xs">
                <Link
                  to="/inventory"
                  className="hover:text-emerald-400 text-slate-200 font-medium"
                >
                  Inventory
                </Link>
                <Link
                  to="/inventory/upload-single"
                  className="hover:text-emerald-400 text-slate-200"
                >
                  + Add Product
                </Link>
                <Link
                  to="/inventory/upload-bulk"
                  className="hover:text-emerald-400 text-slate-200"
                >
                  Bulk Upload
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
