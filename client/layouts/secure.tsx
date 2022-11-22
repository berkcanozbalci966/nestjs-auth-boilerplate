import { useContext, useEffect } from "react";
import { Layout } from "../types/layout.type";
import AuthContext from "./../context/AuthProvider";
import { useRouter } from "next/router";
import ErrorPage from "../pages/error";
import { useSecureRoute } from "../hooks/useSecureRoute";

const SecureLayout = ({ children }: Layout) => {

  const {isForbidden} = useSecureRoute()

  return <>{isForbidden ? <ErrorPage /> : children}</>;
};

export default SecureLayout;
