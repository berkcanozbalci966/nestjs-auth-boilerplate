import { NextPage } from "next";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ReactNode, ReactElement } from "react";
import { AuthProvider } from "./../context/AuthProvider";
import { GeneralContextProvider } from "../context/GeneralProvider";
import { Flowbite, Spinner } from "flowbite-react";
import { flowbiteTheme as theme } from "../theme";

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
        <AuthProvider>
          {getLayout(
            <Flowbite theme={{ theme }}>
              <Component {...pageProps} />
            </Flowbite>
          )}
        </AuthProvider>
      </GeneralContextProvider>
    </>
  );
}

export default MyApp;
