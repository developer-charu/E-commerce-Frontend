import React from "react";
import { Link, useLocation } from "react-router";
import { Avatar, Typography } from "antd";
import {
  AiOutlineUser,
  AiOutlineShopping,
  AiOutlineHome,
  AiOutlineHeart,
  AiOutlineSetting,
} from "react-icons/ai";
import { ACCOUNT_NAV_ITEMS } from "../../../config/ecommerceNavigation.ts";
import { MOCK_USER_PROFILE } from "../../../mock/ecommerceMockData.ts";

const { Text } = Typography;

const ICON_MAP: Record<string, React.ReactNode> = {
  profile: <AiOutlineUser size={18} />,
  orders: <AiOutlineShopping size={18} />,
  addresses: <AiOutlineHome size={18} />,
  wishlist: <AiOutlineHeart size={18} />,
  settings: <AiOutlineSetting size={18} />,
};

export const AccountSidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-2xs">
      {/* User profile mini header card */}
      <div className="p-4 bg-gradient-to-r from-emerald-700 to-teal-800 text-white flex items-center gap-3">
        <Avatar
          size={46}
          style={{ backgroundColor: "#ffffff", color: "#065f46", fontWeight: "bold" }}
        >
          {MOCK_USER_PROFILE.name.charAt(0)}
        </Avatar>
        <div className="min-w-0">
          <div className="font-semibold text-sm truncate">{MOCK_USER_PROFILE.name}</div>
          <Text style={{ color: "#d1fae5", fontSize: 12 }} className="truncate block">
            {MOCK_USER_PROFILE.email}
          </Text>
        </div>
      </div>

      {/* Account Navigation Links */}
      <div className="p-2 space-y-1">
        {ACCOUNT_NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.key}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
            >
              <span className={isActive ? "text-emerald-600" : "text-gray-400"}>
                {ICON_MAP[item.key] || <AiOutlineUser size={18} />}
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

