import api from "api/utils/api.ts";
import { Invitation } from "../../pages/MyTeam/teamPage.vm.ts";
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

  export const inviteUser = async (userId: number) => {
    const result = await api.post<string>(`/api/teams/invite?user_id=${userId}`);
    return result;
  };

  export const getMyInvitations = async () => {
    const result = await api.get<Invitation[]>("/api/teams/invite");
    return result;
  };

  export const respondToInvitation = async (invitation_id: number, accept: boolean) => {
    const result = await api.put<string>(
      `/api/teams/invite?invitation_id=${invitation_id}&status=${accept}`
    );
    return result;
  };
}
