import { useContext, useEffect } from "react";
import { Layout } from "../types/layout.type";
import AuthContext from "./../context/AuthProvider";
import { useRouter } from "next/router";
import ErrorPage from "../pages/error";

const SecureLayout = ({ children }: Layout) => {
  const { auth } = useContext(AuthContext);
  const router = useRouter();

  const disableSecureRoutes = ["/login", "/register"];

  const isDisableRoute = disableSecureRoutes.includes(router.pathname);

  useEffect(() => {
    if (auth.isAuth && isDisableRoute) {
      router.push("/");
    }
  }, [router.pathname]);

  return <>{auth.isAuth && isDisableRoute ? <ErrorPage /> : children}</>;
};

export default SecureLayout;
