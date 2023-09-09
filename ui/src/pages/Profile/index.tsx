import Avatar from "@/ui/Avatar";
import { Button } from "@/ui/Button";
import TitleInfo from "@/ui/TitleInfo";
import { observer } from "mobx-react-lite";
import AuthStore from "@/stores/AuthStore";
import SelectableChip from "@/components/SelectableChip";
import { useState } from "react";
import DialogBase from "@/dialogs/CreateTeam";

const Profile = observer(() => {
  const [showAchievmentDialog, setShowAchievmentDialog] = useState(false);
  const auth = AuthStore.auth;
  const user = AuthStore.user;

  return (
    <>
      <main className="w-full flex flex-col">
        <div className="max-w-screen-lg mx-auto w-full mt-12 px-6">
          <div
            className="grid gap-3"
            style={{
              gridTemplateColumns: "0.7fr auto 1fr",
              gridTemplateRows: "auto auto auto",
              gridTemplateAreas: `
            "profile stats skills"
            "profile about about"
            "achievements achievements achievements"
          `
            }}>
            <section
              className="bg-bg-primary rounded-lg p-4 card flex flex-col"
              style={{ gridArea: "profile" }}>
              <div className="flex justify-between items-center gap-2">
                <div>
                  <h3 className="text-xl mb-2">{auth?.fullname}</h3>
                  <a
                    className="text-text-link font-bold underline hover:no-underline"
                    target="_blank"
                    href={`https://t.me/${auth?.nickname ?? "biskwiq"}`}
                    rel="noreferrer">
                    @{auth?.nickname}
                  </a>
                </div>
                <Avatar size={100} />
              </div>
              <div className="text-text-secondary my-4">
                <p>С нами с 24.02.2022</p>
                <p>{user?.ready_to_move ? "Готов" : "Не готов"} к очным хакатонам</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {user?.positions.map((p, index) => (
                    <SelectableChip key={index}>{p}</SelectableChip>
                  ))}
                </div>
              </div>
              <Button className="mt-auto gap-2 font-bold">Позвать в команду</Button>
            </section>
            <section
              className="bg-bg-primary rounded-lg p-4 gap-4 card flex justify-between flex-col"
              style={{ gridArea: "stats" }}>
              <TitleInfo title="Выступление" info={user?.command_pitch} />
              <TitleInfo title="Креативность" info={user?.command_tasks} />
              <TitleInfo title="Ответственность" info={user?.command_interest} />
            </section>
            <section
              className="rounded-lg p-4 gap-2 flex flex-col card"
              style={{ gridArea: "skills" }}>
              <h4 className="text-text-secondary">Навыки</h4>
              <div
                className="grid gap-2"
                style={{
                  gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))"
                }}>
                {user?.competences.map((c, index) => (
                  <SelectableChip key={index}>{c}</SelectableChip>
                ))}
              </div>
            </section>
            <section
              className="bg-bg-primary rounded-lg p-4 gap-3 card flex justify-between"
              style={{ gridArea: "about" }}>
              <TitleInfo title="О себе" info={user?.description} />
            </section>
          </div>
          <div className="card">
            <h3 className="text-xl mb-4">Достижения</h3>
            <div className="flex flex-wrap gap-3">
              <div
                className="flex gap-2 flex-col border border-border-primary bg-bg-secondary rounded-lg p-4 w-fit hover:bg-bg-tetriary transition-colors cursor-pointer"
                onClick={() => setShowAchievmentDialog(true)}>
                <div className="flex items-center gap-3">
                  <span className="text-4xl">🏅</span>
                  <TitleInfo title="3 место" info="VK Definition Hack" />
                </div>
                <div className="flex gap-3 flex-col">
                  <TitleInfo title="Год" info="2021" />
                  <TitleInfo title="Кейс" info="Создание VK Mini Apps приложения" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <DialogBase
        title="В разработке"
        subtitle="Пока что тут ничего нет, но скоро будет!"
        width={400}
        confirmText="Круть"
        onCancel={() => setShowAchievmentDialog(false)}
        isOpen={showAchievmentDialog}
        onConfirm={() => setShowAchievmentDialog(false)}
      />
    </>
  );
});

export default Profile;
