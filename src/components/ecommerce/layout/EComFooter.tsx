import React from "react";
import { Link } from "react-router";

export const EComFooter: React.FC = () => {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 bg-emerald-600 text-white rounded-lg flex items-center justify-center font-bold text-base">
                Σ
              </span>
              <span className="font-bold text-lg text-white">
                Sigma<span className="text-emerald-500">Store</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              Enterprise-grade responsive E-Commerce application with modular component architecture,
              centralized role-based navigation, and high-performance React 19 UI.
            </p>
            <div className="text-xs text-slate-500">
              © {new Date().getFullYear()} Sigma Greens. All rights reserved.
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/products" className="hover:text-emerald-400 transition-colors">
                  Product Catalog
                </Link>
              </li>
              <li>
                <Link to="/products?category=electronics" className="hover:text-emerald-400 transition-colors">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/products?category=audio" className="hover:text-emerald-400 transition-colors">
                  Audio & Wearables
                </Link>
              </li>
              <li>
                <Link to="/products?category=computers" className="hover:text-emerald-400 transition-colors">
                  Computers & Laptops
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">
              Account & Help
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/account/profile" className="hover:text-emerald-400 transition-colors">
                  My Profile
                </Link>
              </li>
              <li>
                <Link to="/account/orders" className="hover:text-emerald-400 transition-colors">
                  Order Tracking
                </Link>
              </li>
              <li>
                <Link to="/account/addresses" className="hover:text-emerald-400 transition-colors">
                  Saved Addresses
                </Link>
              </li>
              <li>
                <span className="text-slate-400 hover:text-emerald-400 cursor-pointer">
                  Shipping & Returns
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Architecture & Demo Note */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">
              UI Architecture Note
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              This layout supports dynamic switching between <span className="text-emerald-400 font-mono">USER</span>,{" "}
              <span className="text-amber-400 font-mono">SALES</span>, and{" "}
              <span className="text-blue-400 font-mono">ADMIN</span> modes. Switch roles in the top header.
            </p>
            <div className="flex items-center gap-2">
              <span className="inline-block px-2 py-0.5 text-[10px] font-semibold bg-emerald-950 text-emerald-400 rounded border border-emerald-800">
                React 19
              </span>
              <span className="inline-block px-2 py-0.5 text-[10px] font-semibold bg-blue-950 text-blue-400 rounded border border-blue-800">
                Ant Design 6
              </span>
              <span className="inline-block px-2 py-0.5 text-[10px] font-semibold bg-cyan-950 text-cyan-400 rounded border border-cyan-800">
                Tailwind v4
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

