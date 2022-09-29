import { Login } from "../types/auth.type";
import HttpClient from "../utils/http-client";

const httpClient = new HttpClient();

class AuthService {
  async login(formData: Login) {
    return await httpClient.post("/auth/login", formData);
  }

  async register(formData: any) {
    return await httpClient.post("/auth/signup", formData);
  }
}

export default AuthService;
