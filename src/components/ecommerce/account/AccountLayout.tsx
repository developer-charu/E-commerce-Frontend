import React from "react";
import { EComLayoutComponent } from "../layout/EComLayoutComponent.tsx";
import { AccountSidebar } from "../sidebar/AccountSidebar.tsx";

interface AccountLayoutProps {
  children: React.ReactNode;
}

export const AccountLayout: React.FC<AccountLayoutProps> = ({ children }) => {
  return (
    <EComLayoutComponent sidebar={<AccountSidebar />}>
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-2xs">
        {children}
      </div>
    </EComLayoutComponent>
  );
};

