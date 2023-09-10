import DialogBase from "@/dialogs/DialogBase";
import { Button } from "@/ui/Button";
import TitleInfo from "@/ui/TitleInfo";
import { Team } from "api/endpoints/TeamEndpoints";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import TeamPageViewModel from "../teamPage.vm";
import { Input } from "@/ui/Input";
import Avatar from "@/ui/Avatar";
import UsersStore from "../../../pages/Users/users.vm";
import { UserResult } from "api/endpoints/AuthEndpoint.ts";
interface ITeamCard {
  team: Team;
}

const TeamCard = (x: ITeamCard) => {
  const teamMembersProfiles = () => UsersStore.items.filter((member) => member.user.team_id === x.team.users[0].team_id).map((x) => x.profile);
  const getUsersCount = () => x.team.users.length;
  const getSumRating = (profiles: UserResult[]) => profiles.reduce((acc, x) => acc + x.rating, 0);
const getAvgRating = () => {
    const profiles = teamMembersProfiles();
    if (profiles.length === 0) return 0;
    return getSumRating(profiles) / getUsersCount();
}
  return (
    <div className="card flex flex-col gap-4">
      <h6 className="text-xl font-bold">{x.team.name}</h6>
      <div className="flex justify-between gap-6">
        <TitleInfo title={"Рейтинг (ср.)"} info={getAvgRating()} />
        <TitleInfo title={"Участников"} info={x.team.users.length.toString()} />
      </div>
      <div className="flex items-center justify-between gap-2">
        <div
          className="flex flex-wrap items-center gap-2 relative"
          style={{
            width: x.team.users.length * 20,
            height: 32
          }}>
          {x.team.users.map((_, index) => {
            return (
              <div
                key={index}
                className="absolute"
                style={{
                  left: `${index * 20}px`
                }}>
                <Avatar size={32} />
              </div>
            );
          })}
        </div>
      </div>
      <Button className="mt-auto" appearance="secondary">
        Подать заявку
      </Button>
    </div>
  );
};

export const NoTeam = observer(() => {
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
        <section
          className="grid gap-2"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
          {TeamPageViewModel.allTeams.map((x) => {
            return <TeamCard key={x.name} team={x} />;
          })}
        </section>
      </div>
    </>
  );
});
