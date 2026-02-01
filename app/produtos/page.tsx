import Link from "next/link";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function ProdutosPage() {
  const featuredProduct = products.find((p) => p.featured);
  const standardProducts = products.filter((p) => !p.featured);

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <p className="text-coffee/60 text-sm mb-2">Conheça agora</p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-coffee mb-2">
          Todos os cafés
        </h1>
        <div className="w-16 h-1 bg-copper rounded-full mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProduct && (
            <div className="lg:col-span-1">
              <ProductCard product={featuredProduct} variant="featured" />
            </div>
          )}
          {standardProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              variant="standard"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
