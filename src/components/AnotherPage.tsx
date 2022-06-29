import Link from "next/link";
import { useEffect, useState } from "react";
import products from "../products";
import Collection from "./Collection";

export default function Another() {
  const dataReady = useDelay();

  return (
    <div>
      <Link href="/">Link to home</Link>
      <h1>Another Page with Products</h1>
      <Collection products={products.slice(0, 6)} />
      {dataReady && <Collection products={products.slice(8, 12)} />}
    </div>
  );
}

function useDelay() {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 1000);
  }, []);

  return isReady;
}
