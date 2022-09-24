import axios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from "axios";

export default class HttpClient {
  private config: AxiosRequestConfig = {
    baseURL: "http://localhost:3600/",
    withCredentials: true,
  };
  private _axios: AxiosInstance = axios.create(this.config);

  constructor() {
    //@ts-ignore
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
  errorResponseInterceptor(response: any) {
    console.log(response.response.data.Body.message);

    return Promise.reject(response.data.Header);
  }
}