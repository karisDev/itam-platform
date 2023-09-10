import AuthStore from "@/stores/AuthStore";
import { Button } from "@/ui/Button";
import { observer } from "mobx-react-lite";
import { InviteCard, RequestCard, Stats, SubmitEventResult } from "./Cards";
import MedalSvg from "../assets/medal.svg";
import usersVm from "../../../pages/Users/users.vm";
import { useNavigate } from "react-router-dom";
import HackathonsViewModel from "../../../pages/Hackathons/hackathons.vm";

interface ITitleInfo {
  title: string;
}

export const TopHeading = (x: ITitleInfo) => {
  return (
    <div className={"bg-bg-primary w-full min-h-[128px] border-b-[1px] border-border-primary"}>
      <div className="max-w-screen-lg mx-auto w-full h-full flex items-center justify-start px-6">
        <h2 className="text-[32px] font-normal">{x.title}</h2>
      </div>
    </div>
  );
};

const TeamMember = (x: { fullname: string; role: string }) => {
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

//component if users have team
export const HaveTeam = observer(() => {
  const navigate = useNavigate();
  HackathonsViewModel;
  return (
    <div className="flex flex-col w-full pb-4">
      <TopHeading title={AuthStore.team?.name ?? "???"} />
      <main className="max-w-screen-lg mx-auto w-full px-6 mt-12">
        {AuthStore.participations
          ?.filter((p) => p.status === "В процессе участия")
          .map((p) => (
            <SubmitEventResult
              key={p.id}
              participationId={p.id}
              title={HackathonsViewModel.items.find((i) => i.id === p.event_id)?.title ?? ""}
            />
          ))}
        <div
          className="grid mt-3"
          style={{
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "auto auto auto",
            gridGap: "14px",
            gridTemplateAreas: `
            "members stats"
            "members last-match"
            "invites requests"
            `
          }}>
          <div className="card flex flex-col gap-6" style={{ gridArea: "members" }}>
            <div className="flex justify-between">
              <h5 className="text-xl font-semibold">Участники</h5>
            </div>
            {AuthStore.team?.users.map((x) => {
              return (
                <TeamMember
                  key={x.id}
                  fullname={x.fullname}
                  role={
                    usersVm.items.find((u) => u.user.id === x.id)?.profile.positions.join(", ") ??
                    "Участник"
                  }
                />
              );
            })}
            <Button className="mt-auto" onClick={() => navigate("/users")}>
              Найти участников
            </Button>
          </div>
          <div
            className="card flex items-center justify-between gap-6"
            style={{ gridArea: "stats" }}>
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
        </div>
      </main>
    </div>
  );
});
