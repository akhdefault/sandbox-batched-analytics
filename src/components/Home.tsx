import Link from "next/link";
import { useEffect, useState } from "react";
import products from "../products";
import Collection from "./Collection";

export default function Home() {
  const csr = useCsr();
  const dataReady = useDelay();
  const [isCollectionAdded, setIsCollectionAdded] = useState(false);

  return (
    <div>
      <Link href="/another">Link to another page with products</Link>
      <h1>Home</h1>
      <Collection products={products.slice(0, 6)} />
      {csr && <Collection products={products.slice(4, 11)} />}
      {dataReady && <Collection products={products.slice(8, 12)} />}
      {isCollectionAdded && <Collection products={products.slice(10, 14)} />}
      <br />
      {!isCollectionAdded && (
        <button onClick={() => setIsCollectionAdded(true)}>
          Add more products
        </button>
      )}
    </div>
  );
}

function useCsr() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  return isMounted;
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
