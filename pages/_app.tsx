import "../styles/globals.css";
import type { AppProps } from "next/app";
import CtxProvider from "../src/components/Ctx";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CtxProvider>
      <Component {...pageProps} />
    </CtxProvider>
  );
}

export default MyApp;
