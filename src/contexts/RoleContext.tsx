import React, { createContext, useState, useMemo } from "react";
import type { UserRole } from "../types/ecommerce.types";

export interface RoleContextValue {
  role: UserRole;
  setRole: (role: UserRole) => void;
  isRole: (targetRole: UserRole) => boolean;
}

export const RoleContext = createContext<RoleContextValue | null>(null);

export const RoleProvider: React.FC<{
  initialRole?: UserRole;
  children: React.ReactNode;
}> = ({ initialRole = "USER", children }) => {
  const [role, setRole] = useState<UserRole>(initialRole);

  const value = useMemo<RoleContextValue>(
    () => ({
      role,
      setRole,
      isRole: (targetRole: UserRole) => role === targetRole,
    }),
    [role]
  );

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
};
