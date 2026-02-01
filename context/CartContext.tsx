"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export type GrindOption = "grao" | "moido";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  weight: string;
  image?: string;
  grindOption?: GrindOption;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string, grindOption?: GrindOption) => void;
  updateQuantity: (id: string, quantity: number, grindOption?: GrindOption) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity">, quantity = 1) => {
      setItems((prev) => {
        const grind = item.grindOption ?? "grao";
        const existing = prev.find(
          (i) => i.id === item.id && (i.grindOption ?? "grao") === grind
        );
        if (existing) {
          return prev.map((i) =>
            i.id === item.id && (i.grindOption ?? "grao") === grind
              ? { ...i, quantity: i.quantity + quantity }
              : i
          );
        }
        return [...prev, { ...item, grindOption: grind, quantity }];
      });
      setIsCartOpen(true);
    },
    []
  );

  const removeItem = useCallback((id: string, grindOption?: GrindOption) => {
    setItems((prev) =>
      prev.filter(
        (i) =>
          !(i.id === id && (i.grindOption ?? "grao") === (grindOption ?? "grao"))
      )
    );
  }, []);

  const updateQuantity = useCallback(
    (id: string, quantity: number, grindOption?: GrindOption) => {
      setItems((prev) =>
        prev
          .map((i) =>
            i.id === id && (i.grindOption ?? "grao") === (grindOption ?? "grao")
              ? { ...i, quantity }
              : i
          )
          .filter((i) => i.quantity > 0)
      );
    },
    []
  );

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
