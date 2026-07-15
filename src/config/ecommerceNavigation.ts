import type { NavigationItem, UserRole } from "../types/ecommerce.types";

export const ECOMMERCE_NAV_ITEMS: NavigationItem[] = [
  {
    key: "products",
    label: "Browse Products",
    path: "/products",
    allowedRoles: ["USER", "SALES", "ADMIN"],
  },
  {
    key: "categories",
    label: "Categories",
    path: "/products",
    allowedRoles: ["USER", "SALES", "ADMIN"],
    children: [
      {
        key: "cat-electronics",
        label: "Electronics",
        path: "/products?category=electronics",
        allowedRoles: ["USER", "SALES", "ADMIN"],
      },
      {
        key: "cat-audio",
        label: "Audio & Wearables",
        path: "/products?category=audio",
        allowedRoles: ["USER", "SALES", "ADMIN"],
      },
      {
        key: "cat-computers",
        label: "Computers & Office",
        path: "/products?category=computers",
        allowedRoles: ["USER", "SALES", "ADMIN"],
      },
      {
        key: "cat-home",
        label: "Home & Kitchen",
        path: "/products?category=home-kitchen",
        allowedRoles: ["USER", "SALES", "ADMIN"],
      },
    ],
  },
  {
    key: "account",
    label: "My Account",
    path: "/account/profile",
    allowedRoles: ["USER", "SALES", "ADMIN"],
    children: [
      {
        key: "account-profile",
        label: "My Profile",
        path: "/account/profile",
        allowedRoles: ["USER", "SALES", "ADMIN"],
      },
      {
        key: "account-orders",
        label: "My Orders",
        path: "/account/orders",
        allowedRoles: ["USER", "SALES", "ADMIN"],
      },
      {
        key: "account-addresses",
        label: "Addresses",
        path: "/account/addresses",
        allowedRoles: ["USER", "SALES", "ADMIN"],
      },
    ],
  },
  {
    key: "inventory-group",
    label: "Inventory & Management",
    path: "/inventory",
    allowedRoles: ["SALES", "ADMIN"],
    children: [
      {
        key: "nav-inventory",
        label: "Product Inventory",
        path: "/inventory",
        allowedRoles: ["SALES", "ADMIN"],
      },
      {
        key: "nav-upload-single",
        label: "Single Product Upload",
        path: "/inventory/upload-single",
        allowedRoles: ["SALES", "ADMIN"],
      },
      {
        key: "nav-upload-bulk",
        label: "Bulk Product Upload",
        path: "/inventory/upload-bulk",
        allowedRoles: ["SALES", "ADMIN"],
      },
      {
        key: "nav-update-single",
        label: "Single Product Update",
        path: "/inventory/update-single",
        allowedRoles: ["SALES", "ADMIN"],
      },
      {
        key: "nav-update-bulk",
        label: "Bulk Product Update",
        path: "/inventory/update-bulk",
        allowedRoles: ["SALES", "ADMIN"],
      },
    ],
  },
];

export const ACCOUNT_NAV_ITEMS = [
  { key: "profile", label: "My Profile", path: "/account/profile" },
  { key: "orders", label: "My Orders", path: "/account/orders" },
  { key: "addresses", label: "Saved Addresses", path: "/account/addresses" },
  { key: "wishlist", label: "My Wishlist", path: "/account/wishlist" },
  { key: "settings", label: "Account Settings", path: "/account/settings" },
];

/**
 * Filter navigation configuration based on role without hardcoding role logic in UI
 */
export const getAuthorizedNavItems = (role: UserRole): NavigationItem[] => {
  return ECOMMERCE_NAV_ITEMS.filter((item) => item.allowedRoles.includes(role)).map((item) => {
    if (item.children) {
      return {
        ...item,
        children: item.children.filter((child) => child.allowedRoles.includes(role)),
      };
    }
    return item;
  });
};

/**
 * Helper to check whether a specific feature path is permitted for a role
 */
export const isRouteAuthorizedForRole = (path: string, role: UserRole): boolean => {
  const checkItem = (item: NavigationItem): boolean => {
    if (item.path === path && item.allowedRoles.includes(role)) return true;
    if (item.children) {
      return item.children.some((child) => checkItem(child));
    }
    return false;
  };
  return ECOMMERCE_NAV_ITEMS.some((item) => checkItem(item));
};

