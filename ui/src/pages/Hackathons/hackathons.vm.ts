import { EventEndpoint, EventResult } from "api/endpoints/EventEndpoint";
import { makeAutoObservable } from "mobx";

class HackathonsViewModel {
  public items: EventResult[] = [];
  constructor() {
    makeAutoObservable(this);
    void this.init();
  }

  private async init() {
    this.items = await EventEndpoint.getEvents();
    this.items.length = 15;
  }
}

export default new HackathonsViewModel();
