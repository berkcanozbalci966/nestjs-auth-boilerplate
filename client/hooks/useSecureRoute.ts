import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthProvider";
import { useRouter } from "next/router";

export const useSecureRoute = () => {
  const {
    auth: { isAuth },
  } = useContext(AuthContext);

  const router = useRouter();

  const disableSecureRoutes = ["/login", "/register"];

  const isDisableRoute = disableSecureRoutes.includes(router.pathname);

  const isForbidden = isAuth && isDisableRoute;

  return {
    isForbidden,
  };
};
