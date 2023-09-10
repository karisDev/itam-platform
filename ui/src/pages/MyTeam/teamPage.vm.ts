import { makeAutoObservable } from "mobx";
import { Team, TeamEndpoints } from "api/endpoints/TeamEndpoints.ts";
import AuthStore from "@/stores/AuthStore.ts";

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
    const team = await TeamEndpoints.createTeam(name);
    AuthStore.team = team;
  }
}

export default new TeamPageViewModel();
