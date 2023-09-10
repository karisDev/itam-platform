import { makeAutoObservable } from "mobx";
import { Team, TeamEndpoints, User } from "api/endpoints/TeamEndpoints.ts";
import AuthStore from "@/stores/AuthStore.ts";

export interface Invitation {
  id: number;
  name: string;
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
    this.myInvitations = await TeamEndpoints.getMyInvitations();
  }



  public async createTeam(name: string) {
    const team = await TeamEndpoints.createTeam(name);
    AuthStore.team = team;
  }

  public myInvitations: Invitation[] = [];
}

export default new TeamPageViewModel();
