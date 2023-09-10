import { AuthEndpoint, UserList } from "api/endpoints/AuthEndpoint";
import { makeAutoObservable } from "mobx";

class UsersStore {
  public items: UserList[] = [];
  constructor() {
    makeAutoObservable(this);
    void this.init();
  }

  private async init() {
    this.items = await AuthEndpoint.getUsers();
  }

  public async sendInvite(userId: number) {
    // if (this.items)
  }
}

export default new UsersStore();
