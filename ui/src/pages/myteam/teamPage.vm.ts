import { makeAutoObservable } from "mobx";

export class TeamPageViewModel {
  constructor() {
    makeAutoObservable(this);
  }

  public teamName: string = "ЧПК МИСиС";
  public teamMembers: ITeamMember[] = [
    {
      id: "1",
      name: "Пригожин, Евгений Викторович",
      avatar: "https://upload.wikimedia.org/wikipedia/commons/3/34/%D0%98%D0%BE%D1%81%D0%B8%D1%84_%D0%9F%D1%80%D0%B8%D0%B3%D0%BE%D0%B6%D0%B8%D0%BD_%D0%B8_%D0%92%D0%B0%D0%BB%D0%B5%D1%80%D0%B8%D1%8F_%28%D0%91%D0%B5%D0%BB%D1%8B%D0%B5_%D0%BD%D0%BE%D1%87%D0%B8_%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3%D0%B0_%E2%80%94_2021._%D0%93%D1%80%D0%B8%D0%B3%D0%BE%D1%80%D0%B8%D0%B9_%D0%9B%D0%B5%D0%BF%D1%81_%D1%81%D0%BE%D0%B1%D0%B8%D1%80%D0%B0%D0%B5%D1%82_%D0%B4%D1%80%D1%83%D0%B7%D0%B5%D0%B9%29_%28cropped%29.jpg",
      role: "Фронтенд",
      isCaptain: true,
    },
    {
      id: "2",
      name: "Уткин Дмитрий Владимирович",
      avatar: "https://cdn.iportal.ru/preview/news/articles/b0167710a9f7e13d719201fe5ad827130d076ac2_675.jpg",
      role: "Бэкенд",
      isCaptain: false,
    },
    {
      id: "3",
      name: "Александр Невзоров",
      avatar: "https://yt3.googleusercontent.com/ytc/AOPolaT5vU2u852y429YLxffSy2hzgAQejfUbobaW-3qZg=s900-c-k-c0x00ffffff-no-rj",
      role: "Дизайнер",
      isCaptain: false,
    }
  ];
}


export interface ITeamMember {
  id: string;
  name: string;
  avatar: string;
  role: string;
  isCaptain: boolean;
}
