import { makeAutoObservable } from "mobx";
import { Team, TeamEndpoints } from "api/endpoints/TeamEndpoints.ts";
import AuthStore from "@/stores/AuthStore.ts";

class TeamPageViewModel {
  constructor() {
    makeAutoObservable(this);
    void this._init();
  }

  public team: Team | null = null;
  public allTeams: Team[] = [];
  private async _init() {
    const user = AuthStore.auth;
    if (user && user.team_id) {
      this.team = await TeamEndpoints.getTeam(user.team_id);
    } else {
      this.allTeams = await TeamEndpoints.getTeams();
    }
  }

  public async createTeam(name: string) {
    const team = await TeamEndpoints.createTeam(name);
    this.team = team;
  }
}

export default new TeamPageViewModel();
