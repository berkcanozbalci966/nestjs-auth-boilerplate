import { Login } from "../types/auth.type";
import HttpClient from "../utils/http-client";

const httpClient = new HttpClient();

class AuthService {
  loginRequest(formData: Login) {
    return httpClient.post("/auth/login", formData);
  }
}

export default AuthService;
