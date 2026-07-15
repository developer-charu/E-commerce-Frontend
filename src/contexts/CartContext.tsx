import React, { createContext, useReducer, useMemo } from "react";
import type { CartState, CartAction, CartItem, Product } from "../types/ecommerce.types";

const INITIAL_CART_STATE: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const calculateTotals = (items: CartItem[]): { totalQuantity: number; totalPrice: number } => {
  return items.reduce(
    (acc, item) => {
      acc.totalQuantity += item.quantity;
      acc.totalPrice += item.product.price * item.quantity;
      return acc;
    },
    { totalQuantity: 0, totalPrice: 0 }
  );
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, quantity = 1 } = action.payload;
      const existingIndex = state.items.findIndex((item) => item.product.id === product.id);

      let updatedItems: CartItem[];
      if (existingIndex > -1) {
        updatedItems = state.items.map((item, index) => {
          if (index === existingIndex) {
            const newQty = Math.min(item.quantity + quantity, item.product.stockCount || 99);
            return { ...item, quantity: newQty };
          }
          return item;
        });
      } else {
        const initialQty = Math.min(quantity, product.stockCount || 99);
        updatedItems = [...state.items, { product, quantity: initialQty }];
      }

      const totals = calculateTotals(updatedItems);
      return {
        items: updatedItems,
        totalQuantity: totals.totalQuantity,
        totalPrice: Number(totals.totalPrice.toFixed(2)),
      };
    }

    case "REMOVE_ITEM": {
      const updatedItems = state.items.filter((item) => item.product.id !== action.payload.productId);
      const totals = calculateTotals(updatedItems);
      return {
        items: updatedItems,
        totalQuantity: totals.totalQuantity,
        totalPrice: Number(totals.totalPrice.toFixed(2)),
      };
    }

    case "UPDATE_QUANTITY": {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        return cartReducer(state, { type: "REMOVE_ITEM", payload: { productId } });
      }

      const updatedItems = state.items.map((item) => {
        if (item.product.id === productId) {
          const clampedQty = Math.min(quantity, item.product.stockCount || 99);
          return { ...item, quantity: clampedQty };
        }
        return item;
      });

      const totals = calculateTotals(updatedItems);
      return {
        items: updatedItems,
        totalQuantity: totals.totalQuantity,
        totalPrice: Number(totals.totalPrice.toFixed(2)),
      };
    }

    case "CLEAR_CART":
      return INITIAL_CART_STATE;

    default:
      return state;
  }
};

export interface CartContextValue {
  cart: CartState;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, INITIAL_CART_STATE);

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      addItem: (product: Product, quantity = 1) =>
        dispatch({ type: "ADD_ITEM", payload: { product, quantity } }),
      removeItem: (productId: string) =>
        dispatch({ type: "REMOVE_ITEM", payload: { productId } }),
      updateQuantity: (productId: string, quantity: number) =>
        dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } }),
      clearCart: () => dispatch({ type: "CLEAR_CART" }),
    }),
    [cart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
