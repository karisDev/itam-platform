import AuthStore from "@/stores/AuthStore";
import { AuthEndpoint, UserList } from "api/endpoints/AuthEndpoint";
import { makeAutoObservable } from "mobx";

class UsersStore {
  public items: UserList[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  public async init() {
    const result = await AuthEndpoint.getUsers();
    this.items = result.filter((x) => x.user.id !== AuthStore.auth?.id);
  }
}

export default new UsersStore();
