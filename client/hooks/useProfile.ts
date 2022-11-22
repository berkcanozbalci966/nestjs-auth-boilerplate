import useAuth from "./useAuth";
import { useEffect } from "react";
import AuthService from "../services/auth.service";

const authService = new AuthService();

export const useProfile = () => {
  const { setUser, auth, isFirstProfileCall, setIsFirstProfileCall } =
    useAuth();

  useEffect(() => {
    async function getProfile() {
      await authService.profile().then((res: any) => {
        setUser((prev: any) => ({ ...prev, ...res.user }));
      });
    }
    if (!auth.isAuth && isFirstProfileCall) {
      getProfile();
      setIsFirstProfileCall(false);
    }
  }, []);
};
