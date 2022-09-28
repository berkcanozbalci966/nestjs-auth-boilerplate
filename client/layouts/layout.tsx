import { ReactNode, useContext, useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import useHttpClient from "./../hooks/useHttpClient";
import useAuth from "../hooks/useAuth";
import AuthContext from "../context/AuthProvider";
import GeneralContext from "../context/GeneralProvider";
import { useRouter } from "next/router";

type Layout = {
  children: ReactNode;
};

const Layout = ({ children }: Layout) => {
  const { auth, setAuth } = useAuth();
  const [firstAuthLoading, setFirstAuthLoading] = useState(true);
  const newHttpClient = useHttpClient();
  const router = useRouter();

  const disableSecureRoutes = ["/login"];

  const isDisableRoute = disableSecureRoutes.includes(router.pathname);
  useEffect(() => {
    async function getProfile() {
      return await newHttpClient.post("/auth/refresh").then((response: any) => {
        setAuth((prev: any) => {
          return { ...prev, ...response };
        });
        setFirstAuthLoading(false);

        return;
      });
    }

    if (!auth.isAuth && !auth.accessToken && firstAuthLoading) {
      getProfile();
    }

    return () => {};
  }, [auth.userId, auth.accessToken, firstAuthLoading]);

  useEffect(() => {
    if ((auth.accessToken && !isDisableRoute, !firstAuthLoading)) {
      newHttpClient.get("/auth/profile").then((res) => {
        setAuth((prev: any) => ({ ...prev, ...res }));
      });
    }
  }, [firstAuthLoading]);

  return (
    <div className="flex flex-col" style={{ minHeight: "100vh" }}>
      <Navbar />
      <main className="flex-grow mb-2 container px-5 py-24 mx-auto">
        {children}
      </main>
      {JSON.stringify(auth, null, 2)}
      <Footer />
    </div>
  );
};

export default Layout;
