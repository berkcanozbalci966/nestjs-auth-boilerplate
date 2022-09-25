import { Login } from "../types/auth.type";
import HttpClient from "../utils/http-client";

const httpClient = new HttpClient();

class AuthService {
  async loginRequest(formData: Login) {
    return await httpClient.post("/auth/login", formData);
  }
}

export default AuthService;
