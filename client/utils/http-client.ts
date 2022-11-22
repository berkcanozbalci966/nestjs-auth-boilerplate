import axios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from "axios";

async function refreshTokenRequest() {
  return await axios.post("/auth/refresh", {}, config);
}

const config: AxiosRequestConfig = {
  baseURL: "http://127.0.0.1:3600",
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
};

export default class HttpClient {
  private _axios: AxiosInstance = axios.create(config);

  constructor() {
    this._axios.interceptors.response.use(
      this.validResponseInterceptor.bind(this),
      this.errorResponseInterceptor.bind(this)
    );
  }

  get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this._axios.get(url, config);
  }
  post(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    return this._axios.post(url, data, config);
  }
  put(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    return this._axios.put(url, data, config);
  }
  delete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this._axios.delete(url, config);
  }

  validResponseInterceptor(response: any) {
    const { Header, Body } = response.data;

    return Body;
  }
  async errorResponseInterceptor(axiosError: any) {
    const prevRequest = axiosError?.config;

    if (axiosError?.response?.status === 401 && !prevRequest?.sent) {
      prevRequest.sent = true;
      await refreshTokenRequest();
      return await this._axios(prevRequest);
    }

    return Promise.reject(axiosError);
  }
}
