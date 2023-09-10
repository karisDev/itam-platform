import { Button } from "@/ui/Button.tsx";
import MedalSvg from "./assets/medal.svg";
import TeamPageViewModel from "./teamPage.vm.ts";
import { Team, User } from "api/endpoints/TeamEndpoints.ts";
import TitleInfo from "@/ui/TitleInfo.tsx";
export const TeamPage = () => {
  const vm = TeamPageViewModel;
  return !vm.team ? <HaveTeam vm={vm} /> : <NoTeam vm={vm} />;
};

const TeamMember = (x: User) => {
  return (
    <div className="justify-between items-center gap-8 inline-flex">
      <div className="justify-start items-center gap-3 inline-flex">
        <div
          className="w-[32px] h-[32px] rounded-full itam-gradient object-cover"
        />
        <div className="text-base font-medium truncate">{x.fullname}</div>
      </div>
      <div className=" text-sm font-medium text-text-secondary">{x.role}</div>
    </div>
  );
};

interface ITeamPageViewModel {
  vm: typeof TeamPageViewModel;
}

const mocTeam: Team[] = [
  {
    name: "Team 1",
    users: [
      {
        id: 1,
        fullname: "User 1",
        role: "Frontend",
        email: "ads@.com",
        nickname: "user1",
        team_id: 1
      },
      {
        id: 2,
        fullname: "User 2",
        role: "Backend",
        email: "ads@.com",
        nickname: "user2",
        team_id: 1
      },
      {
        id: 3,
        fullname: "User 3",
        role: "Designer",
        email: "ads@.com",
        nickname: "user3",
        team_id: 1
      }
    ]
  },
  {
    name: "Team 2",
    users: [
      {
        id: 1,
        fullname: "User 1",
        role: "Frontend",
        email: "ads@.com",
        nickname: "user1",
        team_id: 1
      }
    ]
  }
];
const NoTeam = (x: ITeamPageViewModel) => {
  return (
    <div className="max-w-screen-lg mx-auto mt-12 w-full h-full flex flex-col gap-6">
      <div className="card w-full flex flex-col">
        <h5 className="text-xl font-semibold">Вы еще не в команде</h5>
        <div className="flex items-center justify-between gap-6">
          <p className="text-text-secondary">Присоединяйтесь к команде или создайте свою</p>
          <Button className="w-fit">Создать команду</Button>
        </div>
      </div>
      <section className="flex item-center gap-2">
        {x.vm.allTeams.length > 0
          ? x.vm.allTeams.map((x) => {
            return <TeamCard team={x} />;
          })
          : //<div className="w-full h-full flex items-center justify-center">
            //  <p className="text-text-secondary">Нет команд</p>
            //</div>
          mocTeam.map((x) => {
            return <TeamCard team={x} />;
          })}
      </section>
    </div>
  );
};
//component if users have team
const HaveTeam = (x: ITeamPageViewModel) => {
  return (
    <div className="flex flex-col w-full h-full">
      <TopHeading title={x.vm.team?.name ?? "???"} />
      <main
        className="max-w-screen-lg mx-auto grid w-full mt-12"
        style={{
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr 1fr",
          gridGap: "14px",
          gridTemplateAreas: `
          "members stats"
          "members last-match"
          "invites requests"
          `
        }}>
        <div className="card flex flex-col gap-6" style={{ gridArea: "members" }}>
          <h5 className="text-xl font-semibold">Участники</h5>
          {x.vm.team?.users.map((x) => {
            return <TeamMember {...x} />;
          })}
          <Button>Найти участников</Button>
        </div>
        <div className="card flex items-center justify-between gap-6" style={{ gridArea: "stats" }}>
          <Stats title="Уровень" value="мидл" />
          <Stats title="Участников" value="3" />
          <Stats title="Побед" value="2" />
          <Stats title="Участий" value="8" />
        </div>
        <div className="card card flex flex-col gap-6" style={{ gridArea: "last-match" }}>
          <h5 className="text-base font-medium flex">
            Последние достижения <MedalSvg />
          </h5>
          <div className="flex gap-6">
            <Stats title="Место" value={"2"} />
            <Stats title={"Хакатон"} value={"True Tech Hack"} />
            <Stats title={"Кейс"} value={"Адаптация фильмов"} />
          </div>
        </div>
        {/*
        <div className="card flex flex-col gap-6" style={{ gridArea: "invites" }}>
          <p>инвайты</p>
        </div>
        <div className="card flex flex-col gap-6" style={{ gridArea: "requests" }}>
          <p>заявки</p>
        </div>
        */}
      </main>
    </div>
  );
};

interface ITitleInfo {
  title: string;
}
const TopHeading = (x: ITitleInfo) => {
  return (
    <div className={"bg-bg-primary w-full h-[128px] border-b-[1px] border-border-primary"}>
      <div className="max-w-screen-lg mx-auto w-full h-full flex items-center justify-start px-6">
        <h2 className="text-[32px] font-normal">{x.title}</h2>
      </div>
    </div>
  );
};
interface IStats {
  title: string;
  value: string;
}
const Stats = (x: IStats) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-sm font-medium text-text-secondary">{x.title}</div>
      <div className="text-base font-medium">{x.value}</div>
    </div>
  );
};

interface ITeamCard {
  team: Team;
}
const TeamCard = (x: ITeamCard) => {
  const lvl = ["джуниор", "мидл", "сеньор"];
  const randomLvl = lvl[Math.floor(Math.random() * lvl.length)];
  return (
    <div className="card flex flex-col gap-3 w-[356px]">
      <h6 className="text-xl font-bold">{x.team.name}</h6>
      <div className="flex items-center gap-6">
        <TitleInfo title={"Уровень"} info={randomLvl} />
        <TitleInfo title={"Участников"} info={x.team.users.length.toString()} />
      </div>
      <div className="flex items-center justify-between gap-2">
        <div id="team members" className="flex items-center" style={{ gap: "-12px" }}>
          {x.team.users.map((_, index) => {
            return (
              <div
                className={
                  "w-[32px] h-[32px] rounded-full itam-gradient border border-bg-primary object-cover transform hover:scale-110 transition-all"
                }
                style={{ transform: `translateX(-${index * 12}px)` }}
                key={index}
              />
            );
          })}
        </div>
        <Button className="w-fit">Подать заявку</Button>
      </div>
    </div>
  );
};
