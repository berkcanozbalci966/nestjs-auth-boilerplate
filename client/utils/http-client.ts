import axios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from "axios";

export default class HttpClient {
  private config: AxiosRequestConfig = {
    baseURL: "http://localhost:3600/",
    withCredentials: true,
    headers: {
      "Content-type": "application/json",
    },
  };
  private _axios: AxiosInstance = axios.create(this.config);

  constructor() {
    //@ts-ignore
    this._axios.interceptors.response.use(
      this.validResponseInterceptor.bind(this),
      this.errorResponseInterceptor.bind(this)
    );

    this._axios.interceptors.request.use(
      this.beforeRequestInterceptor.bind(this),
      (err) => {
        console.log(err, "TEST1234");
        return Promise.reject(err);
      }
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

    if (axiosError.response.status === 401 && !prevRequest?.sent) {
      prevRequest.sent = true;
      const refreshToken = await this.refreshTokenRequest();
      prevRequest.headers["Authorization"] = `Bearer ${refreshToken}`;

      return this._axios(prevRequest);
    }

    return Promise.reject(axiosError);
  }

  beforeRequestInterceptor(config: any) {
    return config;
  }

  async refreshTokenRequest() {
    return await this._axios.post("/auth/refresh");
  }
}
