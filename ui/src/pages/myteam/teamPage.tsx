import { ITeamMember, TeamPageViewModel } from "./teamPage.vm.ts";
import { Button } from "@/ui/Button.tsx";
import TitleInfo from "@/ui/TitleInfo.tsx";

export const TeamPage = () => {
  const vm = new TeamPageViewModel();
  if (!vm) return null;
  return (
    <main className="max-w-screen-lg mx-auto grid w-full mt-[48px]"
          style={{ gridTemplateColumns: "1fr 1fr",
                    gridTemplateRows: "4fr 7fr",
            gridGap: "14px",
                    gridTemplateAreas: '"members stats" "members last-match"' }}>
      <div className="card flex flex-col gap-6" style={{ gridArea: "members" }}>
        <h5 className="text-xl font-semibold">Участники</h5>
        {
          vm.teamMembers.map((x: ITeamMember) => {
            return <TeamMember {...x} />;
          }
          )
}
<Button>Найти участников</Button>
      </div>
      <div className="card flex items-center justify-between gap-6" style={{ gridArea: "stats" }}>
        <TitleInfo title="Уровень" info="мидл" />
        <TitleInfo title="Участников" info="4" />
        <TitleInfo title="Побед" info="12" />
        <TitleInfo title="Участий" info="8" />
      </div>
      <div className="card card flex flex-col gap-6" style={{ gridArea: "last-match" }}>
        <h5 className="text-base font-medium">Последние достижения</h5>
        <div className="flex gap-6">
          <TitleInfo title="Место" info="3" />
          <TitleInfo title="Хакатон" info="True Tech Hack" />
          <TitleInfo title="Кейс" info="Построение кратчайшего пути" />
        </div>
      </div>
    </main>
  );
}




const TeamMember = (x: ITeamMember) => {
  return (
    <div className="justify-between items-center gap-8 inline-flex">
      <div className="justify-start items-center gap-3 inline-flex">
      <img className="w-[32px] h-[32px] rounded-full itam-gradient object-cover" src={x.avatar} alt={x.name} />
        <div className="text-base font-medium truncate">{x.name}</div>
      </div>
        <div className=" text-sm font-medium text-text-secondary">{x.role}</div>
      </div>
  );
}

