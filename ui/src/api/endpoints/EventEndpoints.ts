// {
//     "id": 1,
//     "title": "Hack.Genesis_ONLINE_",
//     "date_event": "29-31 января 2021",
//     "date_registration": "до 27 января 2021",
//     "prize": "100 000 рублей!",
//     "target": "разработчики, дизайнеры, продуктологи, аналитики",
//     "image_url": "https://static.tildacdn.com/tild6431-3038-4763-a538-306365363363/-FOmqDc-FOg.jpg"
//   },

import api from "api/utils/api";

export interface EventResult {
  id: number;
  title: string | null;
  date_event: string | null;
  date_registration: string | null;
  prize: string | null;
  target: string | null;
  image_url: string | null;
}

export namespace EventEndpoints {
  export const getEvents = async () => {
    const result = await api.get<EventResult[]>("/api/events");
    return result;
  };
}
