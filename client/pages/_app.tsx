import { NextPage } from "next";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ReactNode, ReactElement } from "react";
import { AuthProvider } from "./../context/AuthProvider";
import { GeneralContextProvider } from "../context/GeneralProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <GeneralContextProvider>
        <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
      </GeneralContextProvider>
      <ToastContainer />
    </>
  );
}

export default MyApp;
