"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import CartDrawer from "./CartDrawer";

export default function Header() {
  const { totalItems, openCart, closeCart, isCartOpen } = useCart();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-sand/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-14 h-14 flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="Adoçado no Pé"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="font-serif text-xl font-bold text-coffee hidden sm:block">
                adoçadonope
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/produtos"
                className="text-coffee hover:text-copper transition-colors"
              >
                Produtos
              </Link>
            </nav>

            <button
              onClick={openCart}
              className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-espresso text-white hover:bg-coffee transition-colors"
              aria-label="Ver carrinho"
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
              <span>Carrinho</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-copper text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
}
