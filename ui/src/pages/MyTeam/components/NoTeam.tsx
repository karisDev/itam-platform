import DialogBase from "@/dialogs/DialogBase";
import { Button } from "@/ui/Button";
import TitleInfo from "@/ui/TitleInfo";
import { Team } from "api/endpoints/TeamEndpoints";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import TeamPageViewModel from "../teamPage.vm";
import { Input } from "@/ui/Input";

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
        <section className="flex item-center gap-2">
          {TeamPageViewModel.allTeams.map((x) => {
            return <TeamCard key={x.name} team={x} />;
          })}
        </section>
      </div>
    </>
  );
});
