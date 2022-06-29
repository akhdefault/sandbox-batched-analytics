import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { Ctx } from "./Ctx";

type ProductCardProps = {
  product: {
    name: string;
  };
};

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { enqueueImpression } = useContext(Ctx);
  useEffect(() => {
    const page = router.pathname === "/" ? "home page" : "another page";
    enqueueImpression({ productName: product.name, page });
  }, [enqueueImpression, product.name, router]);

  return <div>ProductCard - {product.name}</div>;
}
