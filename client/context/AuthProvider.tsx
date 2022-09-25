import { createContext, useState } from "react";

export type AuthContextType = {
  setAuth: (authInfo: any) => void;
  auth: {
    name: string;
    accessToken: string;
  };
};

const initialAuthValue = {
  name: "test",
  accessToken: "",
};

const AuthContext = createContext<AuthContextType>({
  auth: { name: "Yeah" },
} as AuthContextType);

type AuthProvider = {
  children: any;
};

export const AuthProvider: React.FC<AuthProvider> = ({ children }) => {
  const [auth, setAuth] = useState(initialAuthValue);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
