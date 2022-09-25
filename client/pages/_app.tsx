import { NextPage } from "next";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ReactNode, ReactElement } from "react";
import { AuthProvider } from "./../context/AuthProvider";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
    </>
  );
}

export default MyApp;
