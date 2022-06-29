import { useRouter } from "next/router";
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { logProductImpressions } from "../analytics";
import { Impression } from "../types";

type CtxValue = {
  enqueueImpression: (impression: Impression) => void;
};

type CtxProviderProps = {
  children: ReactNode;
};

const MAX_DELTA = 300;

export const Ctx = createContext<CtxValue>({} as CtxValue);

export default function CtxProvider({ children }: CtxProviderProps) {
  const router = useRouter();
  const pendingImpressions = useRef<Impression[]>([]);
  const submittedImpressions = useRef<Impression[]>([]);
  const lastSubmitted = useRef(Date.now());
  const timer = useRef<number | NodeJS.Timeout>();

  const submitImpressions = useCallback(() => {
    console.log("check for duplicates before submit");
    if (pendingImpressions.current.length) {
      const deduped = dedupeImpressions(pendingImpressions.current);
      const newImpressions = deduped.filter((pending) => {
        return !submittedImpressions.current.find((submitted) => {
          return pending.productName === submitted.productName;
        });
      });
      if (newImpressions.length) {
        submittedImpressions.current = [
          ...submittedImpressions.current,
          ...newImpressions,
        ];
        console.log("submit");
        logProductImpressions(newImpressions);
      }
      lastSubmitted.current = Date.now();
    }
  }, []);

  const handleQueue = useCallback(() => {
    const now = Date.now();
    timer.current = setTimeout(() => {
      clearTimeout(timer.current);
      if (now - lastSubmitted.current > MAX_DELTA) {
        submitImpressions();
      } else {
        console.log("skip");
        handleQueue();
      }
    }, MAX_DELTA);
  }, [submitImpressions]);

  const enqueueImpression = useCallback(
    (impression: Impression) => {
      console.log("enqueue");
      pendingImpressions.current.push(impression);
      handleQueue();
    },
    [handleQueue]
  );

  const clearImpressions = useCallback(() => {
    pendingImpressions.current = [];
    submittedImpressions.current = [];
  }, []);

  useEffect(() => {
    router.events.on("routeChangeStart", clearImpressions);

    return () => {
      router.events.off("routeChangeStart", clearImpressions);
    };
  }, [clearImpressions, router.events]);

  return <Ctx.Provider value={{ enqueueImpression }}>{children}</Ctx.Provider>;
}

function dedupeImpressions(impressions: Impression[]) {
  const uniqueProducts = Array.from(
    new Set(impressions.map((imp) => imp.productName))
  );
  const result = uniqueProducts.map((name) => {
    return impressions.find((imp) => imp.productName === name) as Impression; // we know for sure it has to be there
  });

  return result;
}
