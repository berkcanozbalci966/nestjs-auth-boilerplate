import { NextPage } from "next";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ReactNode, ReactElement, useEffect } from "react";
import { AuthProvider } from "./../context/AuthProvider";
import { GeneralContextProvider } from "../context/GeneralProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const { push, asPath, pathname, locale,isReady } = useRouter();
 
  useEffect(() => {
    if (window) {
       const currentLang = JSON.parse(localStorage.getItem('lng')as string)  
      push({ pathname }, asPath, { locale: currentLang });
    }
    
  }, [isReady])
  

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
