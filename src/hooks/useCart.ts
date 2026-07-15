import { useContext } from "react";
import { CartContext } from "../contexts/CartContext.tsx";
import type { CartContextValue } from "../contexts/CartContext.tsx";

export const useCart = (): CartContextValue => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

