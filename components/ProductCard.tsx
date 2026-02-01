"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";

const attributeIcons = {
  flame: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
    </svg>
  ),
  leaf: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  bean: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

interface ProductCardProps {
  product: Product;
  variant?: "standard" | "featured";
}

export default function ProductCard({ product, variant = "standard" }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      weight: product.weight,
      image: product.image,
    });
  };

  const formatPrice = (price: number) =>
    price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  const attributes = product.attributes ?? [
    { icon: "flame" as const, label: "Torra média clara" },
    { icon: "leaf" as const, label: "100% Arábica" },
    { icon: "bean" as const, label: "Café único" },
  ];

  if (variant === "featured") {
    return (
      <Link href={`/produtos/${product.id}`}>
        <article className="group h-full rounded-2xl overflow-hidden bg-espresso flex flex-col shadow-xl">
          <div className="relative aspect-square bg-cream/10 overflow-hidden">
            <Image
              src={product.image}
              alt={`${product.name} ${product.weight}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
          </div>
          <div className="p-6 flex flex-col flex-1">
            <h3 className="font-serif font-bold text-xl text-white mb-3">
              {product.name} {product.weight}
            </h3>
            <p className="text-white/90 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
              {product.description}
            </p>
            <p className="font-bold text-white text-2xl mb-4">
              {formatPrice(product.price)}
            </p>
            <span className="text-white/90 text-sm font-medium mb-4 hover:underline inline-flex items-center gap-1">
              Mais informações
              <span>→</span>
            </span>
            <button
              onClick={handleAddToCart}
              className="w-full py-4 px-6 rounded-xl bg-copper hover:bg-rust text-white font-bold shadow-lg transition-colors mt-auto"
              type="button"
            >
              Adicionar ao carrinho
            </button>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/produtos/${product.id}`}>
      <article className="group h-full bg-white rounded-2xl overflow-hidden border border-sand/20 hover:shadow-xl hover:border-sand/40 transition-all duration-300 flex flex-col">
        <div className="relative aspect-square bg-cream overflow-hidden">
          <Image
            src={product.image}
            alt={`${product.name} ${product.weight}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="font-serif font-bold text-lg text-coffee text-center mb-4">
            {product.name} {product.weight}
          </h3>
          <div className="flex justify-center gap-4 mb-4 flex-wrap">
            {attributes.map((attr, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-1 text-coffee/70"
              >
                <span className="text-copper">
                  {attributeIcons[attr.icon as keyof typeof attributeIcons] ?? attributeIcons.bean}
                </span>
                <span className="text-xs">{attr.label}</span>
              </div>
            ))}
          </div>
          <p className="font-bold text-coffee text-xl text-center mt-auto">
            {formatPrice(product.price)}
          </p>
          <button
            onClick={handleAddToCart}
            className="mt-4 w-full py-4 px-6 rounded-xl bg-copper hover:bg-rust text-white font-bold shadow-lg transition-colors"
            type="button"
          >
            Adicionar ao carrinho
          </button>
        </div>
      </article>
    </Link>
  );
}
