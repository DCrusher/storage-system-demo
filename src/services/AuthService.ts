import Cookies from "js-cookie";
import jwt from "jwt-simple";

const secret = "storage-system-demo-app";

class AuthService {
  signin(signin: string, password: string) {
    Cookies.set("token", jwt.encode({ user: signin }, secret));
  }

  signout() {
    Cookies.set("token", "");
  }

  isAuthorized() {
    const token = Cookies.get("token");
    return token;
  }

  get user() {
    const token: string = Cookies.get("token") || "";

    return jwt.decode(token, secret).user;
  }
}

export default new AuthService();
