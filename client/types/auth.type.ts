export type Login = {
  usernameOrEmail?: string;
  password?: string;
};

export type AuthProvider = {
  children: any;
};

export type AuthContextType = {
  setAuth: (authInfo: any) => void;
  logOut: () => void;
  auth: {
    name: string;
    isAuth: boolean;
    userId: number;
  };
};
