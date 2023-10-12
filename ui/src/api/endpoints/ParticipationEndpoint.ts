import api from "api/utils/api";

export interface Participation {
  id: number;
  team_id: number;
  event_id: number;
  place: string;
  status:
    | "В процессе участия"
    | "На проверке модератором"
    | "Требуется оценка"
    | "Участие завершено";
  repo_url: string;
  description: string;
  added_to_rating: number;
}

export interface ParticipationUpdate {
  participation_id: number;
  place: string;
  repo_url: string;
  description: string;
}

export interface ParticipationFinish {
  participation_id: number;
  points: number;
}

export namespace ParticipationEndpoint {
  export const register = async (eventId: number) => {
    const result = await api.post<unknown>(`/api/participation?event_id=${eventId}`);
    return result;
  };

  export const getList = async (teamId: number) => {
    const result = await api.get<Participation[]>(`/api/participation/?team_id=${teamId}`);
    return result;
  };

  export const submit = async (data: ParticipationUpdate) => {
    const result = await api.put<unknown>(`/api/participation/${data.participation_id}/`, data);
    return result;
  };

  export const finish = async (data: ParticipationFinish) => {
    const result = await api.post<unknown>(
      `/api/admin/finish_participation?participation_id=${data.participation_id}&points=${data.points}`
    );
    return result;
  };

  export const decline = async (participationId: number) => {
    const result = await api.post<unknown>(
      `/api/admin/decline_participation?participation_id=${participationId}`
    );
    return result;
  };
}
