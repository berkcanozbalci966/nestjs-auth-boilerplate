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
  setAuth: (authInfo: any) => void;
  logOut: () => void;
  refresRequestResponse: boolean;
  setRefreshRequestResponse: (type: boolean) => void;
  accessRequestResponse: boolean;
  setAccessRequestResponse: (type: boolean) => void;
  setUser: (user: any) => void;
  auth: {
    name: string;
    isAuth: boolean;
    accessToken: string;
  };
  user: {
    id: number;
  };
};
