import { ITeamMember, TeamPageViewModel } from "./teamPage.vm.ts";
import { Button } from "@/ui/Button.tsx";

export const TeamPage = () => {
  const vm = new TeamPageViewModel();
  if (!vm) return null;
  return (
    <main className="max-w-screen-lg mx-auto grid w-full mt-[48px]"
          style={{ gridTemplateColumns: "1fr 1fr",
                    gridTemplateRows: "1fr 1fr",
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
        <Stats title="Снарядов" value="3000" />
        <Stats title="Побед" value="3" />
        <Stats title="Поражений" value="1" />
        <Stats title="Участий" value="8" />
      </div>
      <div className="card card flex flex-col gap-6" style={{ gridArea: "last-match" }}>
        <h5 className="text-base font-medium">Последние достижения</h5>
        <div className="flex items-center gap-6">
          <Stats title="Победа" value="3" />
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
