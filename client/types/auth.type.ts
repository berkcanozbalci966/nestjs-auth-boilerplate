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
  refresRequestResponse: boolean;
  setRefreshRequestResponse: (type: boolean) => void;
  accessRequestResponse: boolean;
  setAccessRequestResponse: (type: boolean) => void;
  auth: {
    name: string;
    isAuth: boolean;
    userId: number;
    accessToken: string;
  };
};
