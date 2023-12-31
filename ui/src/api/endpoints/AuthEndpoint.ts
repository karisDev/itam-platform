import api from "api/utils/api";
import { setStoredAuthToken } from "api/utils/authToken";
import { parseJwt } from "api/utils/parseJwt";

export interface UserAuth {
  id: number;
  email: string;
  fullname: string;
  nickname: string;
  role: string;
  team_id: number | null;
}

export interface UserResult {
  user_id: number;
  positions: string[];
  competences: string[];
  description: string;
  ready_to_move: boolean;
  command_pitch: number;
  command_tasks: number;
  command_interest: number;
  rating: number;
  participation_count: number;
}

export interface UserUpdate {
  positions: string[];
  competences: string[];
  description: string;
  ready_to_move: boolean;
}

export interface UserList {
  user: UserAuth;
  profile: UserResult;
}

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
    fullname: string,
    nickname: string,
    password: string
  ) => {
    const result = await api.post<{ access_token: string }>("/api/auth/register", {
      email,
      fullname,
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

  export const checkAuthFinished = async (id: number) => {
    const result = await api.get<boolean>(`/api/users/profile/check?user_id=${id}`);
    return result;
  };

  export const getUser = async (id: number) => {
    const result = await api.get<UserResult>(`/api/users/profile/${id}`);
    return result;
  };

  export const updateUser = async (data: UserResult) => {
    const result = await api.post<string>(`/api/users/profile?user_id=${data.user_id}`, data);
    return result;
  };

  export const getUsers = async () => {
    const result = await api.get<UserList[]>("/api/users/for_team");
    return result;
  };
}
