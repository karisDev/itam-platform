import { Button } from "@/ui/Button.tsx";
import MedalSvg from "./assets/medal.svg";
import TeamPageViewModel from "./teamPage.vm.ts";
import { Team, User } from "api/endpoints/TeamEndpoints.ts";
import TitleInfo from "@/ui/TitleInfo.tsx";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import DialogBase from "@/dialogs/DialogBase.tsx";
import { Input } from "@/ui/Input.tsx";
import AuthStore from "@/stores/AuthStore.ts";

export const TeamPage = observer(() => {
  const vm = TeamPageViewModel;
  return AuthStore.team ? <HaveTeam vm={vm} /> : <NoTeam vm={vm} />;
});

const TeamMember = (x: User) => {
  return (
    <div className="justify-between items-center gap-8 inline-flex">
      <div className="justify-start items-center gap-3 inline-flex">
        <div className="w-[32px] h-[32px] rounded-full itam-gradient object-cover" />
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
const NoTeam = observer((x: ITeamPageViewModel) => {
  const [showCreateTeamDialog, setShowCreateTeamDialog] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onCreateTeam = async () => {
    if (loading) return;
    if (!teamName) {
      setError(true);
      return;
    }
    setLoading(true);
    setError(false);

    try {
      await TeamPageViewModel.createTeam(teamName);
      setShowCreateTeamDialog(false);
    } finally {
      setLoading(false);
    }
  };

  const onCancel = () => {
    if (loading) return;

    setTeamName("");

    setShowCreateTeamDialog(false);
  };

  return (
    <>
      <DialogBase
        isOpen={showCreateTeamDialog}
        confirmText="Создать"
        title="Новая команда"
        width={500}
        onCancel={onCancel}
        onConfirm={onCreateTeam}>
        <Input
          error={error}
          label="Название команды"
          placeholder="ЧПК МИСиС"
          value={teamName}
          disabled={loading}
          onChange={(v) => setTeamName(v)}
        />
      </DialogBase>
      <div className="max-w-screen-lg mx-auto mt-12 w-full h-full flex flex-col gap-6">
        <div className="card flex items-center">
          <div className="flex flex-col">
            <h5 className="text-xl font-semibold">Вы еще не в команде</h5>
            <p className="text-text-secondary">Присоединяйтесь к команде или создайте свою</p>
          </div>
          <Button className="w-fit ml-auto" onClick={() => setShowCreateTeamDialog(true)}>
            Создать команду
          </Button>
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
    </>
  );
});

//component if users have team
const HaveTeam = observer((x: ITeamPageViewModel) => {
  return (
    <div className="flex flex-col w-full h-full">
      <TopHeading title={AuthStore.team?.name ?? "???"} />
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
          {AuthStore.team?.users.map((x) => {
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
        <div className="card flex flex-col gap-6" style={{ gridArea: "invites" }}>
          <h5 className="text-xl font-semibold">Приглашения</h5>
          <div className="flex flex-col gap-4">
            <InviteCard name={"Виталий Дмитриевич Бутерин"} />
            <InviteCard name={"Сергей Владимирович Брин"} />
            <InviteCard name={"Ларри Пейдж"} />
          </div>
        </div>
        <div className="card flex flex-col gap-6" style={{ gridArea: "requests" }}>
          <h5 className="text-xl font-semibold">Заявки</h5>
          <div className="flex flex-col gap-4">
            <RequestCard name={"Линус Бенедикт Торвальдс"} />
          </div>
        </div>
      </main>
    </div>
  );
});

interface MockInvite {
  name: string;
}
const InviteCard = (x: MockInvite) => {
  return (
    <div className="justify-between items-center gap-8 inline-flex">
      <div className="justify-start items-center gap-3 inline-flex cursor-pointer hover:underline">
        <div className="w-[24px] h-[24px] rounded-full itam-gradient object-cover" />
        <div className=" text-sm font-medium truncate ">{x.name}</div>
      </div>
      <Button className="px-2 py-1 text-xs h-[30px] w-fit" appearance={"secondary"}>
        Отозвать
      </Button>
    </div>
  );
};

const RequestCard = (x: MockInvite) => {
  return (
    <div className="justify-between items-center gap-8 inline-flex">
      <div className="justify-start items-center gap-2 inline-flex cursor-pointer hover:underline">
        <div className="w-[24px] h-[24px] rounded-full itam-gradient object-cover" />
        <div className=" text-sm font-medium truncate">{x.name}</div>
      </div>
      <div className="flex items-center gap-2">
        <Button className="px-2 py-1 text-xs h-[30px]">Принять</Button>
        <Button className="px-2 py-1 text-xs h-[30px]" appearance={"secondary"}>
          Отклонить
        </Button>
      </div>
    </div>
  );
};

interface ITitleInfo {
  title: string;
}
const TopHeading = (x: ITitleInfo) => {
  return (
    <div className={"bg-bg-primary w-full min-h-[128px] border-b-[1px] border-border-primary"}>
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
