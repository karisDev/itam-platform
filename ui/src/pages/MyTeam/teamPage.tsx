import { Button } from "@/ui/Button.tsx";
import MedalSvg from "./assets/medal.svg";
import TeamPageViewModel from "./teamPage.vm.ts";
import { User } from "api/endpoints/TeamEndpoints.ts";
export const TeamPage = () => {
  const vm = TeamPageViewModel;
  return vm.team ? <HaveTeam vm={vm}/> : <NoTeam vm={vm}/>
}

const TeamMember = (x: User) => {
  return (
    <div className="justify-between items-center gap-8 inline-flex">
      <div className="justify-start items-center gap-3 inline-flex">
      <img className="w-[32px] h-[32px] rounded-full itam-gradient object-cover" alt={x.fullname} />
        <div className="text-base font-medium truncate">{x.fullname}</div>
      </div>
        <div className=" text-sm font-medium text-text-secondary">{x.role}</div>
      </div>
  );
}
//component if users don't have team

interface ITeamPageViewModel {
  vm: typeof TeamPageViewModel;
}
const NoTeam = (x: ITeamPageViewModel) => {
  return(
    <div className="max-w-screen-lg mx-auto mt-[16px] w-full h-full flex flex-col gap-6">
      <div className="card w-full flex flex-col">
        <h5 className="text-xl font-semibold">Вы еще не в команде</h5>
        <div className="flex items-center justify-between gap-6">
        <p className="text-text-secondary">Присоединяйтесь к команде или создайте свою</p>
        <Button className="w-fit">Создать команду</Button>
        </div>
      </div>
      <div className={"flex flex-col gap-6"}>
      {x.vm.allTeams.map((team) => {
        return <p>{team.name}</p>;
      })}
      </div>
    </div>
  )
}

//component if users have team
const HaveTeam = (x: ITeamPageViewModel) => {
  return(
    <div className="flex flex-col w-full h-full">
      <TopHeading title={x.vm.team?.name ?? "???"}/>
      <main className="max-w-screen-lg mx-auto grid w-full mt-[48px]"
            style={{ gridTemplateColumns: "1fr 1fr",
              gridTemplateRows: "1fr 1fr",
              gridGap: "14px",
              gridTemplateAreas: '"members stats" "members last-match"' }}>
        <div className="card flex flex-col gap-6" style={{ gridArea: "members" }}>
          <h5 className="text-xl font-semibold">Участники</h5>
          {
            x.vm.team?.users.map((x => {
                return <TeamMember {...x} />;
              }
            ))
          }
          <Button>Найти участников</Button>
        </div>
        <div className="card flex items-center justify-between gap-6" style={{ gridArea: "stats" }}>
          <Stats title="Уровень" value="мидл" />
          <Stats title="Участников" value="3" />
          <Stats title="Побед" value="2" />
          <Stats title="Участий" value="8" />
        </div>
        <div className="card card flex flex-col gap-6" style={{ gridArea: "last-match" }}>
          <h5 className="text-base font-medium flex">Последние достижения <MedalSvg/></h5>
          <div className="flex gap-6">
            <Stats title="Место" value={"2"}/>
            <Stats title={"Хакатон"} value={"True Tech Hack"}/>
            <Stats title={"Кейс"} value={"Адаптация фильмов"}/>
          </div>
        </div>
      </main>
    </div>
  )
}

interface ITitleInfo {
  title: string;
}
const TopHeading = (x: ITitleInfo) => {
  return(
    <div className={"bg-bg-primary w-full h-[128px] border-b-[1px] border-border-primary"}>
      <div className="max-w-screen-lg mx-auto w-full h-full flex items-center justify-start px-6">
        <h2 className="text-[32px] font-normal">{x.title}</h2>
      </div>
    </div>
  )
}
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
}
