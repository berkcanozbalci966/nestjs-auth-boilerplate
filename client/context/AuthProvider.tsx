import { createContext, useState, useEffect } from "react";
import {
  AuthContextType,
  AuthProvider as AuthProviderType,
} from "../types/auth.type";
import HttpClient from "../utils/http-client";

const httpClient = new HttpClient();

const initialAuthValue = {
  name: "",
  isAuth: false,
  userId: 0,
};

const AuthContext = createContext<AuthContextType>({
  auth: initialAuthValue,
} as AuthContextType);

export const AuthProvider: React.FC<AuthProviderType> = ({ children }) => {
  const [auth, setAuth] = useState(initialAuthValue);
  useEffect(() => {
    if (auth.userId) {
      setAuth({ ...auth, isAuth: true });
    }
  }, [auth.userId]);

  function logOut() {
    httpClient.get("/auth/logout");
    setAuth(initialAuthValue);
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
