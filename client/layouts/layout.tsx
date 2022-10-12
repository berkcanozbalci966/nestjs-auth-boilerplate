import { ReactNode, useEffect, useState } from "react";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer";
import useHttpClient from "./../hooks/useHttpClient";
import useAuth from "../hooks/useAuth";

type Layout = {
  children: ReactNode;
};

const Layout = ({ children }: Layout) => {
  const {
    auth,
    setAuth,
    setRefreshRequestResponse,
    refresRequestResponse,
    accessRequestResponse,
    setAccessRequestResponse,
    user,
    setUser,
  } = useAuth();
  const [firstAuthLoading, setFirstAuthLoading] = useState(true);
  const newHttpClient = useHttpClient();

  useEffect(() => {
    async function getProfile() {
      return await newHttpClient
        .post("/auth/refresh")
        .then((response: any) => {
          setAuth((prev: any) => {
            return { ...prev, ...response };
          });
          setRefreshRequestResponse(true);
          setFirstAuthLoading(false);

          return;
        })
        .catch(() => {
          setRefreshRequestResponse(false);
          setAccessRequestResponse(false);
        });
    }

    if (!auth.isAuth && !auth.accessToken && refresRequestResponse) {
      getProfile();
    }

    return () => {};
  }, [user.id, auth.accessToken, firstAuthLoading]);

  useEffect(() => {
    async function getProfile() {
      await newHttpClient
        .get("/auth/profile")
        .then((res: any) => {
          setUser((prev: any) => ({ ...prev, ...res.user }));
          setAccessRequestResponse(false);
        })
        .catch(() => {
          setAccessRequestResponse(false);
        });
    }

    if (accessRequestResponse && auth.accessToken) {
      getProfile();
    }
  }, [firstAuthLoading, auth.accessToken]);

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div className="container mx-auto px-4 mb-5">
          <Navbar />

          <main>{children}</main>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
