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
  userId: 0,
  accessToken: "",
};

const AuthContext = createContext<AuthContextType>({
  auth: initialAuthValue,
} as AuthContextType);

export const AuthProvider: React.FC<AuthProviderType> = ({ children }) => {
  const [auth, setAuth] = useState(initialAuthValue);
  const router = useRouter();

  useEffect(() => {
    if (auth.userId) {
      setAuth((prev) => {
        return { ...prev, isAuth: true };
      });
    }
  }, [auth.userId]);

  function logOut() {
    httpClient.get("/auth/logout");
    setAuth(initialAuthValue);
    setTimeout(() => {
      router.push("/");
    }, 500);
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
