export interface Product {
  id: string;
  name: string;
  price: number;
  weight: string;
  description: string;
  fullDescription?: string;
  image: string;
  category: string;
  featured?: boolean;
  attributes?: { icon: string; label: string }[];
  modoPreparo?: string;
  modoConservacao?: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Adoçado no Pé",
    price: 70,
    weight: "500g",
    description:
      "Cafés Gourmet 100% Arábica. Café em grãos, torra média clara. Opção de moer disponível. Tradição de raiz, alma mineira.",
    fullDescription:
      "Nosso café tem origem nas montanhas de Minas Gerais, cultivado há quatro gerações pela família Luís e Valquíria com afeto, cuidado e dedicação. O cultivo em altitudes acima de 900 metros permite um amadurecimento lento dos grãos, resultando em um sabor único e suave. Não precisa de açúcar - porque esse já vem Adoçado no Pé. Vendemos em grãos — com opção de moer sob encomenda. Tradição de raiz, alma mineira, essência do café.",
    image: "/cafe500.png",
    category: "gourmet",
    featured: true,
    attributes: [
      { icon: "flame", label: "Torra média clara" },
      { icon: "leaf", label: "100% Arábica" },
      { icon: "bean", label: "Em grãos" },
    ],
    modoPreparo:
      "Para cada litro de água, use de 4 a 5 colheres de sopa de Café Adoçado no Pé. Não deixe a água ferver. Ao primeiro sinal de bolhas, despeje lentamente a água sobre o pó de café no centro do filtro ou coador, molhando todo o pó.",
    modoConservacao:
      "Mantenha em local seco e fresco. Após aberto, manter a embalagem bem fechada, longe de odores fortes e consumir preferencialmente em 30 dias.",
  },
  {
    id: "2",
    name: "Adoçado no Pé",
    price: 130,
    weight: "1kg",
    description:
      "Cafés Gourmet 100% Arábica. Café em grãos, torra média clara. Opção de moer disponível. Tradição de raiz, alma mineira.",
    fullDescription:
      "Nosso café tem origem nas montanhas de Minas Gerais, cultivado há quatro gerações pela família com afeto e cuidado. Cultivado em altitudes acima de 900 metros, o café Adoçado no Pé oferece um sabor incomparável. Vendemos em grãos — com opção de moer sob encomenda. Tradição de raiz, alma mineira, essência do café.",
    image: "/cafe1.png",
    category: "gourmet",
    attributes: [
      { icon: "flame", label: "Torra média clara" },
      { icon: "leaf", label: "100% Arábica" },
      { icon: "bean", label: "Em grãos" },
    ],
    modoPreparo:
      "Para cada litro de água, use de 4 a 5 colheres de sopa de Café Adoçado no Pé. Não deixe a água ferver. Ao primeiro sinal de bolhas, despeje lentamente a água sobre o pó de café no centro do filtro ou coador, molhando todo o pó.",
    modoConservacao:
      "Mantenha em local seco e fresco. Após aberto, manter a embalagem bem fechada, longe de odores fortes e consumir preferencialmente em 30 dias.",
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
