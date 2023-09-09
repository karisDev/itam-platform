import api from "api/utils/api";
import { setStoredAuthToken } from "api/utils/authToken";
import { parseJwt } from "api/utils/parseJwt";

export interface UserAuth {
  email: string;
  fullname: string;
  nickname: string;
  role: string;
}
export interface UserResult {}

export namespace AuthEndpoint {
  export const login = async (username: string, password: string) => {
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);

    const result = await api.post<{ access_token: string }>("/api/auth/login", params.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    setStoredAuthToken(result.access_token);
    return parseJwt<UserAuth>(result.access_token);
  };

  export const register = async (
    email: string,
    name: string,
    nickname: string,
    password: string
  ) => {
    const result = await api.post<{ access_token: string }>("/api/auth/register", {
      email,
      name,
      nickname,
      password
    });

    setStoredAuthToken(result.access_token);
    return parseJwt<UserAuth>(result.access_token);
  };

  export const getAuth = async () => {
    const result = await api.get<UserAuth>("/api/users/me");
    return result;
  };
}
