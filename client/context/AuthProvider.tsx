import { createContext, useState, useEffect } from "react";

export type AuthContextType = {
  setAuth: (authInfo: any) => void;
  auth: {
    name: string;
    accessToken: string;
    isAuth: boolean;
    userId: number;
  };
};

const initialAuthValue = {
  name: "",
  accessToken: "",
  isAuth: false,
  userId: 0,
};

const AuthContext = createContext<AuthContextType>({
  auth: { name: "Yeah" },
} as AuthContextType);

type AuthProvider = {
  children: any;
};

export const AuthProvider: React.FC<AuthProvider> = ({ children }) => {
  const [auth, setAuth] = useState(initialAuthValue);
  useEffect(() => {
    if (auth.userId) {
      setAuth({ ...auth, isAuth: true });
    }
  }, [auth.userId]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
