import { AuthEndpoint, UserAuth, UserResult, UserUpdate } from "api/endpoints/AuthEndpoint";
import { Participation, ParticipationEndpoint } from "api/endpoints/ParticipationEndpoint";
import { Team, TeamEndpoints } from "api/endpoints/TeamEndpoints";
import { removeStoredAuthToken } from "api/utils/authToken";
import { makeAutoObservable } from "mobx";
import { Invitation } from "src/pages/MyTeam/teamPage.vm";
import UsersVm from "../../pages/Users/users.vm";

type AuthState = "loading" | "anonymous" | "authorized" | "unfinished";

const AuthStore = new (class {
  public user: UserResult | null = null;
  public auth: UserAuth | null = null;
  public team: Team | null = null;
  public participations: Participation[] | null = null;
  public invitations: Invitation[] | null = null;
  public authState: AuthState = "loading";

  constructor() {
    makeAutoObservable(this);
    this.checkAuth();
  }

  //#region Auth
  public async login(username: string, password: string) {
    if (!username || !password) return false;
    try {
      const auth = await AuthEndpoint.login(username, password);
      await this.setUserAndAuthState(auth);
      return true;
    } catch {
      return false;
    }
  }

  public async register(email: string, name: string, nickname: string, password: string) {
    if (!email || !name || !nickname || !password) return false;
    try {
      const auth = await AuthEndpoint.register(email, name, nickname, password);
      await this.setUserAndAuthState(auth);
      return true;
    } catch {
      return false;
    }
  }

  public logout() {
    this.setUserAndAuthState(null);
  }

  public async checkAuth() {
    try {
      const auth = await AuthEndpoint.getAuth();
      this.setUserAndAuthState(auth);
    } catch {
      this.setUserAndAuthState(null);
    }
  }
  //#endregion

  public async fetchTeam() {
    if (this.auth?.team_id) {
      this.team = await TeamEndpoints.getTeam(this.auth.team_id);
    } else {
      this.team = null;
    }
  }

  public async fetchInvitations() {
    if (!this.auth) {
      this.invitations = null;
      return;
    }
    this.invitations = await TeamEndpoints.getMyInvitations();
  }

  public async fetchParticipations() {
    if (!this.auth?.team_id) return null;
    try {
      this.participations = await ParticipationEndpoint.getList(this.auth.team_id);
    } catch {
      this.participations = null;
    }
  }

  private async setUserAndAuthState(userAuth: UserAuth | null) {
    this.auth = userAuth;
    if (userAuth === null) {
      removeStoredAuthToken();
      this.user = null;
      this.authState = "anonymous";
      return;
    }

    try {
      const authFinished = await AuthEndpoint.checkAuthFinished(userAuth.id);
      if (!authFinished) {
        this.authState = "unfinished";
        return;
      }

      this.fetchTeam();
      this.fetchInvitations();
      this.fetchParticipations();
      UsersVm.init();
      this.authState = "authorized";
      const user = await AuthEndpoint.getUser(userAuth.id);
      this.user = user;
    } catch {
      this.setUserAndAuthState(null);
    }
  }

  public async finishRegistration(data: UserUpdate) {
    if (!this.auth) return false;
    const updatedUser: UserResult = {
      ...data,
      user_id: this.auth.id,
      command_pitch: 0,
      command_tasks: 0,
      command_interest: 0,
      rating: 0,
      participation_count: 0
    };
    try {
      await AuthEndpoint.updateUser(updatedUser);
      this.setUserAndAuthState(this.auth);
      return true;
    } catch {
      return false;
    }
  }

  public async registerToEvent(eventId: number) {
    if (!this.auth) return false;
    try {
      await ParticipationEndpoint.register(eventId);
      await this.fetchTeam();
      await this.fetchParticipations();
      return true;
    } catch {
      return false;
    }
  }
})();

export default AuthStore;
