import { Dispatch, SetStateAction } from "react";

export type Login = {
  usernameOrEmail?: string;
  password?: string;
};

export type Register = {
  passwordRepeat: string;
};

export type AuthProvider = {
  children: any;
};

export type AuthContextType = {
  setAuth: (authInfo: any, callback?: any) => void;
  logOut: () => void;
  setUser: (user: any) => void;
  isFirstProfileCall: boolean;
  setIsFirstProfileCall: Dispatch<SetStateAction<boolean>>;
  auth: {
    name: string;
    isAuth: boolean;
  };
  user: {
    id: number;
  };
};
