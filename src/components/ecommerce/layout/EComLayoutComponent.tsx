import React from "react";
import { EComHeader } from "./EComHeader.tsx";
import { EComNavbar } from "./EComNavbar.tsx";
import { EComFooter } from "./EComFooter.tsx";

interface EComLayoutProps {
  children: React.ReactNode;
  /** Optional dedicated sidebar component (e.g. ProductSidebar or AccountSidebar) */
  sidebar?: React.ReactNode;
  /** Custom wrapper class for content area */
  contentClassName?: string;
}

export const EComLayoutComponent: React.FC<EComLayoutProps> = ({
  children,
  sidebar,
  contentClassName = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6",
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      {/* 1. Header with Search, Cart, Role selector, Profile */}
      <EComHeader />

      {/* 2. Main Navigation Bar with Categories & Role-driven shortcuts */}
      <EComNavbar />

      {/* 3. Main Content Body with optional Sidebar */}
      <main className={`flex-1 w-full ${contentClassName}`}>
        {sidebar ? (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Desktop Sidebar Area */}
            <aside className="w-full lg:w-64 shrink-0">
              {sidebar}
            </aside>
            {/* Main Page Content Area */}
            <div className="flex-1 min-w-0">
              {children}
            </div>
          </div>
        ) : (
          <div className="w-full">
            {children}
          </div>
        )}
      </main>

      {/* 4. Footer */}
      <EComFooter />
    </div>
  );
};

export default EComLayoutComponent;

