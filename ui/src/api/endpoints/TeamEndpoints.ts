import api from "api/utils/api.ts";
export interface User {
  id: number;
  email: string;
  nickname: string;
  fullname: string;
  role: string;
  team_id: number | null;
}

export interface Team {
  name: string;
  users: User[];
}

export namespace TeamEndpoints {
  export const getTeams = async () => {
    const result = await api.get<Team[]>("/api/teams");
    return result;
  };

  export const getTeam = async (id: number) => {
    const result = await api.get<Team>(`/api/teams/${id}`);
    return result;
  };

  export const createTeam = async (name: string) => {
    const result = await api.post<Team>(`/api/teams?name=${name}`);
    return result;
  };

  export const enterTeam = async (id: number) => {
    const result = await api.post<Team>(`/api/teams/${id}/enter`);
    return result;
  };

  export const registerToEvent = async (teamId: number, eventId: number) => {
    return null;
    // const result = await api.post<Team>(`/api/teams/${teamId}/events/${eventId}/register`);
    // return result;
  };
}
