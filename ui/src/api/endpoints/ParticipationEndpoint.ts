import api from "api/utils/api";

export interface Participation {
  id: number;
  team_id: number;
  event_id: number;
  place: string;
  status: string;
  repo_url: string;
  description: string;
  added_to_rating: number;
}

export namespace ParticipationEndpoint {
  export const register = async (eventId: number) => {
    const result = await api.post<unknown>(`/api/participation?event_id=${eventId}`);
    return result;
  };

  export const getList = async (teamId: number) => {
    const result = await api.get<Participation[]>(`/api/participation?team_id=${teamId}`);
    return result;
  };
}
