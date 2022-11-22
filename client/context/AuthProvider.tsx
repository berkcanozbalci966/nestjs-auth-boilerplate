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
};

const initialUserValue = {
  id: 0,
};

const AuthContext = createContext<AuthContextType>({
  auth: initialAuthValue,
  user: initialUserValue,
  isFirstProfileCall: true,
} as AuthContextType);

export const AuthProvider: React.FC<AuthProviderType> = ({ children }) => {
  const [auth, setAuth] = useState(initialAuthValue);
  const [user, setUser] = useState(initialUserValue);
  const [isFirstProfileCall, setIsFirstProfileCall] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (user.id) {
      setAuth((prev) => {
        return { ...prev, isAuth: true };
      });
    }
  }, [user]);

  function logOut() {
    httpClient.get("/auth/logout");
    setAuth(initialAuthValue);
    setUser(initialUserValue);
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
        user,
        setUser,
        isFirstProfileCall,
        setIsFirstProfileCall,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
