import React from "react";
import products from "../products";
import ProductCard from "./ProductCard";

type CollectionProps = {
  products: typeof products;
};

export default function Collection({ products }: CollectionProps) {
  return (
    <div>
      <h3>Collection</h3>
      {products.map((p) => (
        <ProductCard key={p.name} product={p} />
      ))}
    </div>
  );
}
