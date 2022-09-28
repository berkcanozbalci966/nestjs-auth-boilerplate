import axios, { AxiosRequestConfig, AxiosInstance } from "axios";
import HttpClient from "../utils/http-client";
import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthProvider";

const config: AxiosRequestConfig = {
  baseURL: "http://localhost:3600/",
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
  timeout: 5000,
};

const _axios: AxiosInstance = axios.create(config);
const useHttpClient = () => {
  const { auth, setAuth } = useContext(AuthContext);

  useEffect(() => {
    const responseInterceptor = _axios.interceptors.response.use(
      (response: any) => {
        const { Header, Body } = response.data;

        return Body;
      },
      async (axiosError: any) => {
        const prevRequest = axiosError?.config;

        if (
          axiosError?.response?.status === 401 &&
          !prevRequest?.sent &&
          prevRequest.url == "/auth/profile" &&
          prevRequest.url !== "/auth/refresh"
        ) {
          prevRequest.sent = true;
          const refreshToken = await refreshTokenRequest();
          prevRequest.headers["Authorization"] = `Bearer ${refreshToken}`;

          return _axios(prevRequest);
        }

        return Promise.reject(axiosError);
      }
    );

    const requestInterceptor = _axios.interceptors.request.use((config) => {
      if (config.headers) {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth.accessToken}`;
        }
        config.headers["Authorization"] = `Bearer ${auth.accessToken}`;
      }
      return config;
    });

    async function refreshTokenRequest() {
      const response: any = await _axios.post("/auth/refresh");
      setAuth((prev: any) => {
        return { ...prev, ...response };
      });
      return response?.accessToken;
    }

    return () => {
      _axios.interceptors.response.eject(responseInterceptor);
      _axios.interceptors.request.eject(requestInterceptor);
    };
  }, [auth]);

  return _axios;
};

export default useHttpClient;
