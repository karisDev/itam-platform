import { makeAutoObservable } from "mobx";
import { Team, TeamEndpoints, User } from "api/endpoints/TeamEndpoints.ts";
import AuthStore from "@/stores/AuthStore.ts";
import {
  ParticipationEndpoint,
  ParticipationFinish,
  ParticipationUpdate
} from "api/endpoints/ParticipationEndpoint";

export interface Invitation {
  id: number;
  team_name: string;
  user: User;
  status: boolean;
  date: string;
}

class TeamPageViewModel {
  constructor() {
    makeAutoObservable(this);
    void this._init();
  }

  public allTeams: Team[] = [];
  private async _init() {
    this.allTeams = await TeamEndpoints.getTeams();
  }

  public async createTeam(name: string) {
    await TeamEndpoints.createTeam(name);
    await AuthStore.fetchTeam();
  }

  public async respondToInvitation(invitation_id: number, accept: boolean) {
    await TeamEndpoints.respondToInvitation(invitation_id, accept);
    await AuthStore.fetchInvitations();
  }

  public async submitParticipation(data: ParticipationUpdate) {
    await ParticipationEndpoint.submit(data);
    await AuthStore.fetchParticipations();
  }

  public async finishParticipation(data: ParticipationFinish, ok: boolean) {
    if (!ok) {
      await ParticipationEndpoint.decline(data.participation_id);
    } else {
      await ParticipationEndpoint.finish(data);
    }
    await AuthStore.fetchParticipations();
  }
}

export default new TeamPageViewModel();
