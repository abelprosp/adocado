"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";

const AUTO_PLAY_INTERVAL = 4000;

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, AUTO_PLAY_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => setCurrentIndex(index);
  const goToPrev = () =>
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  const goToNext = () =>
    setCurrentIndex((prev) => (prev + 1) % products.length);

  return (
    <section className="relative min-h-[90vh] flex flex-col lg:flex-row overflow-x-hidden">
      <div className="flex-1 bg-cream px-4 sm:px-6 lg:px-16 pt-28 sm:pt-32 pb-12 sm:pb-16 lg:pt-40 flex flex-col justify-center relative">
        <div className="absolute top-20 left-6 w-16 h-16 text-coffee/20 rotate-45">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 5 L60 45 L95 50 L60 55 L50 95 L40 55 L5 50 L40 45 Z" />
          </svg>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-coffee leading-tight max-w-xl">
          Nas montanhas de Minas Gerais
        </h1>
        <p className="mt-4 text-sm sm:text-base text-coffee/80 max-w-lg leading-relaxed break-words">
          Nasceu nossa história — continua pelas mãos do Luís e da Valquíria, em quatro gerações de dedicação. Cultivamos os grãos acima de 900 metros de altitude, onde amadurecem devagar e ganham sabor e aroma verdadeiros. Café que nasce com afeto, cresce com cuidado e chega à sua xícara com simplicidade e tradição mineira. E não precisa de açúcar — porque esse já vem{" "}
          <span className="text-copper font-semibold">Adoçado no Pé</span>.
        </p>
        <p className="mt-3 font-serif font-bold text-copper text-base sm:text-lg bg-sand/60 inline-block px-3 py-1 rounded">
          Adoçado no Pé — Tradição de raiz, alma mineira, essência do café.
        </p>
        <div className="flex flex-wrap gap-4 mt-6 sm:mt-8">
          <a
            href="/produtos"
            className="inline-flex items-center px-6 py-3 rounded-full border-2 border-coffee text-coffee font-semibold hover:bg-coffee hover:text-cream transition-colors text-sm sm:text-base"
          >
            Ver Produtos
          </a>
        </div>
      </div>

      <div className="flex-1 bg-sand relative min-h-[400px] lg:min-h-[90vh] flex items-center justify-center px-4 pt-16 pb-12 sm:pt-20 sm:pb-16 lg:p-8">
        <div className="absolute top-8 right-12 w-20 h-20 text-coffee/20 rotate-45">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 5 L60 45 L95 50 L60 55 L50 95 L40 55 L5 50 L40 45 Z" />
          </svg>
        </div>
        <div className="absolute bottom-24 left-16 w-14 h-14 text-coffee/25">
          <svg viewBox="0 0 64 64" fill="currentColor">
            <ellipse cx="32" cy="32" rx="20" ry="28" transform="rotate(20 32 32)" />
          </svg>
        </div>

        <div className="relative z-10 w-full max-w-sm mx-auto pt-4">
          <div className="relative rounded-2xl overflow-visible" style={{ minHeight: "min(520px, 85vw)" }}>
            {products.map((product, index) => (
              <div
                key={product.id}
                className={`absolute inset-x-0 top-0 transition-opacity duration-500 ease-out ${
                  index === currentIndex
                    ? "opacity-100 z-10 relative"
                    : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <Link href={`/produtos/${product.id}`}>
                  <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-2xl text-center">
                    <div className="aspect-[4/5] sm:aspect-[3/4] rounded-xl overflow-hidden mb-4 sm:mb-6 relative bg-cream">
                      <Image
                        src={product.image}
                        alt={`${product.name} ${product.weight}`}
                        fill
                        className="object-cover object-[center_20%]"
                        sizes="400px"
                      />
                    </div>
                    <p className="text-coffee font-semibold text-base sm:text-lg">
                      {product.name}
                    </p>
                    <p className="text-xs sm:text-sm text-coffee/70 mt-1 break-words">
                      Cafés Gourmet 100% Arábica - {product.weight}
                    </p>
                    <p className="text-xs text-coffee/60 mt-1">
                      Em grãos • Opção de moer
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <button
            onClick={goToPrev}
            className="absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 sm:-translate-x-4 w-10 h-10 rounded-full bg-white/95 shadow-lg flex items-center justify-center text-coffee hover:bg-white transition-colors z-20"
            aria-label="Anterior"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 sm:translate-x-4 w-10 h-10 rounded-full bg-white/95 shadow-lg flex items-center justify-center text-coffee hover:bg-white transition-colors z-20"
            aria-label="Próximo"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <div className="flex justify-center gap-2 mt-6">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === currentIndex ? "bg-coffee" : "bg-coffee/30"
                }`}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
