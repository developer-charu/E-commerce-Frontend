import { useContext } from "react";
import { RoleContext } from "../contexts/RoleContext.tsx";
import type { RoleContextValue } from "../contexts/RoleContext.tsx";

export const useRole = (): RoleContextValue => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
};

