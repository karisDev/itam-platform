import AuthStore from "@/stores/AuthStore";
import { Button } from "@/ui/Button";
import { observer } from "mobx-react-lite";
import { InviteCard, RequestCard, Stats, SubmitEventResult } from "./Cards";
import MedalSvg from "../assets/medal.svg";
import usersVm from "../../../pages/Users/users.vm";
import { useNavigate } from "react-router-dom";
import HackathonsViewModel from "../../../pages/Hackathons/hackathons.vm";
import UsersStore from "../../../pages/Users/users.vm";
import { UserResult } from "api/endpoints/AuthEndpoint.ts";
import TitleInfo from "@/ui/TitleInfo.tsx";

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
  const teamMembersProfiles = () => UsersStore.items.filter((x) => x.user.team_id === AuthStore.auth?.team_id).map((x) => x.profile);
  const sumRating = (profiles: UserResult[]) => profiles.reduce((acc, x) => acc + x.rating, 0);
  const getUsersCount = (profiles: UserResult[]) => profiles.length
  const getAvgRating = () => {
    const members = teamMembersProfiles();
    if (members.length === 0) return 0;
    return sumRating(members) / getUsersCount(members);
  }
  const Achievements = () => {
    const participations = AuthStore.participations?.filter((p) => p.status === "Участие завершено").slice(0, 3);
    //get more info for participations from EventsEndpoint.ts
    const getEventTitle = (id: number) => HackathonsViewModel.items.find((i) => i.id === id)?.title ?? "";
    const getDate = (id: number) => HackathonsViewModel.items.find((i) => i.id === id)?.date_event ?? "";
    if (!participations?.length) return <div className={"flex justify-center items-center text-text-secondary text-sm h-[64px]"}>Все еще впереди!</div>
    return (
      <>
      {
        participations.map((p) => (
          <div className="flex gap-6">
            <Stats title={"Хакатон"} info={getEventTitle(p.event_id)} />
            <Stats title={"Дата"} info={getDate(p.event_id)} />
            <Stats title={"Место"} info={p.place ?? "-"} />
          </div>
        ))
      }
      </>
    );
  }
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
            gridTemplateColumns: "10fr 12fr",
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
            {AuthStore.team?.users.map((x) => (
              <TeamMember
                key={x.id}
                fullname={x.fullname}
                role={
                  usersVm.items.find((u) => u.user.id === x.id)?.profile.positions.join(", ") ??
                  "Участник"
                }
              />
            ))}
            <Button className="mt-auto" onClick={() => navigate("/users")}>
              Найти участников
            </Button>
          </div>
          <div
            className="card flex items-center justify-between gap-6"
            style={{ gridArea: "stats" }}>
            <TitleInfo title="Средний рейтинг" info={getAvgRating().toFixed(0).toString()} />
            <TitleInfo title="Участников" info={AuthStore.team?.users.length.toString() || "?"} />
            <TitleInfo title="Побед" info="2" />
            <TitleInfo title="Участий" info="8" />
          </div>
          <div className="card card flex flex-col gap-6" style={{ gridArea: "last-match" }}>
            <h5 className="flex text-xl font-semibold items-center">
              Последние достижения <MedalSvg />
            </h5>
            <Achievements />
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
