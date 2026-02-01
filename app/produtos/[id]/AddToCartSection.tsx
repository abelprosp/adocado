"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";
import type { GrindOption } from "@/context/CartContext";

interface AddToCartSectionProps {
  product: Product;
}

export default function AddToCartSection({ product }: AddToCartSectionProps) {
  const { addItem } = useCart();
  const [grindOption, setGrindOption] = useState<GrindOption>("grao");

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      weight: product.weight,
      image: product.image,
      grindOption,
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="font-serif font-bold text-coffee mb-2">
          Café em grãos — opção de moer disponível
        </p>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="grind"
              value="grao"
              checked={grindOption === "grao"}
              onChange={() => setGrindOption("grao")}
              className="accent-copper"
            />
            <span className="text-coffee">Em grãos</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="grind"
              value="moido"
              checked={grindOption === "moido"}
              onChange={() => setGrindOption("moido")}
              className="accent-copper"
            />
            <span className="text-coffee">Moído</span>
          </label>
        </div>
      </div>
      <button
        onClick={handleAddToCart}
        className="w-full px-8 py-5 rounded-2xl bg-copper hover:bg-rust text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        Adicionar ao carrinho
      </button>
    </div>
  );
}
