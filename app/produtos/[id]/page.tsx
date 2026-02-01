import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById } from "@/data/products";
import AddToCartSection from "./AddToCartSection";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProdutoPage({ params }: PageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const formatPrice = (price: number) =>
    price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-16 overflow-x-hidden">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/produtos"
          className="inline-flex items-center gap-2 text-copper hover:underline mb-8"
        >
          ← Voltar aos produtos
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-cream">
            <Image
              src={product.image}
              alt={`${product.name} ${product.weight}`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div>
            <span className="inline-block px-4 py-1 rounded-full bg-copper/20 text-copper text-sm font-medium mb-4">
              {product.weight}
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-coffee mb-4">
              {product.name}
            </h1>
            <p className="text-2xl font-bold text-copper mb-6">
              {formatPrice(product.price)}
            </p>

            <div className="mb-10">
              <AddToCartSection product={product} />
            </div>

            <div className="space-y-6 text-coffee/90 leading-relaxed">
              <p>{product.fullDescription ?? product.description}</p>

              {product.attributes && product.attributes.length > 0 && (
                <div className="flex flex-wrap gap-4 pt-4">
                  {product.attributes.map((attr, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-full bg-sand/30 text-coffee text-sm font-medium"
                    >
                      {attr.label}
                    </span>
                  ))}
                </div>
              )}

              {product.modoPreparo && (
                <div>
                  <h3 className="font-serif font-bold text-coffee mb-2">
                    Modo de preparo
                  </h3>
                  <p>{product.modoPreparo}</p>
                </div>
              )}

              {product.modoConservacao && (
                <div>
                  <h3 className="font-serif font-bold text-coffee mb-2">
                    Modo de conservação
                  </h3>
                  <p>{product.modoConservacao}</p>
                </div>
              )}

              <div className="flex items-center gap-2 text-sm">
                <svg
                  className="w-5 h-5 text-copper flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                <span>Não contém glúten</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
