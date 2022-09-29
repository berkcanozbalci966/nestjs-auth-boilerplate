import { createContext, useState, useEffect } from "react";
import {
  AuthContextType,
  AuthProvider as AuthProviderType,
} from "../types/auth.type";
import HttpClient from "../utils/http-client";
import { useRouter } from "next/router";

const httpClient = new HttpClient();

const initialAuthValue = {
  name: "",
  isAuth: false,
  accessToken: "",
};

const initialUserValue = {
  id: 0,
};

const AuthContext = createContext<AuthContextType>({
  auth: initialAuthValue,
  refresRequestResponse: true,
  user: initialUserValue,
} as AuthContextType);

export const AuthProvider: React.FC<AuthProviderType> = ({ children }) => {
  const [auth, setAuth] = useState(initialAuthValue);
  const [user, setUser] = useState(initialUserValue);
  const [refresRequestResponse, setRefreshRequestResponse] = useState(true);
  const [accessRequestResponse, setAccessRequestResponse] = useState(true);
  const router = useRouter();

  useEffect(() => {
    console.log("triggered", user.id);
    if (user.id) {
      setAuth((prev) => {
        return { ...prev, isAuth: true };
      });
    }
  }, [user]);

  function logOut() {
    httpClient.get("/auth/logout");
    setAuth(initialAuthValue);
    setTimeout(() => {
      router.push("/");
    }, 500);
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        logOut,
        refresRequestResponse,
        setRefreshRequestResponse,
        accessRequestResponse,
        setAccessRequestResponse,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
