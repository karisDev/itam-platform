import { AuthEndpoint, UserResult } from "api/endpoints/AuthEndpoint";
import { removeStoredAuthToken } from "api/utils/authToken";
import { makeAutoObservable } from "mobx";

type AuthState = "loading" | "anonymous" | "authorized";

const AuthStore = new (class {
  public user: UserResult | null = null;
  public authState: AuthState = "loading";

  constructor() {
    makeAutoObservable(this);
    this.checkAuth();
  }

  public async login(username: string, password: string) {
    if (!username || !password) return false;
    try {
      const auth = await AuthEndpoint.login(username, password);
      await this.setUserAndAuthState(auth.id);
      return true;
    } catch {
      return false;
    }
  }

  public async register(email: string, name: string, nickname: string, password: string) {
    if (!email || !name || !nickname || !password) return false;
    try {
      const user = await AuthEndpoint.register(email, name, nickname, password);
      this.setUserAndAuthState(user.id);
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
      const user = await AuthEndpoint.getAuth();
      this.setUserAndAuthState(user.id);
    } catch {
      this.setUserAndAuthState(null);
    }
  }

  private async setUserAndAuthState(userId: number | null) {
    const user = userId ? await AuthEndpoint.getUser(userId) : null;
    if (user) {
      this.user = user;
      this.authState = "authorized";
    } else {
      removeStoredAuthToken();
      this.user = null;
      this.authState = "anonymous";
    }
  }
})();

export default AuthStore;
