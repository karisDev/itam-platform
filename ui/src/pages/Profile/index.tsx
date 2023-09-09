import Avatar from "@/ui/Avatar";
import { Button } from "@/ui/Button";
import TitleInfo from "@/ui/TitleInfo";
import { observer } from "mobx-react-lite";
import LinkSvg from "@/assets/link.svg";

const Profile = observer(() => {
  return (
    <div className="w-full h-full">
      <main
        className="max-w-screen-lg grid gap-3 mx-auto w-full mt-12 px-6"
        style={{
          gridTemplateColumns: "1fr 1fr 1fr",
          gridTemplateRows: "1fr 1fr auto",
          gridTemplateAreas: `
            "profile stats skills"
            "profile about about"
            "achievements achievements achievements"
          `
        }}>
        <div
          className="bg-bg-primary rounded-lg p-4 card flex flex-col"
          style={{ gridArea: "profile" }}>
          <Avatar size={100} />
          <h3 className="text-xl mt-3">Кирилл Киреев Дмитриевич</h3>
          <p className="text-text-secondary mt-1"> С нами с 24.02.2022</p>
          <Button className="mt-auto gap-2 font-bold">
            Посмотреть команду <LinkSvg width={20} height={20} />
          </Button>
        </div>
        <div
          className="bg-bg-primary rounded-lg p-4 gap-3 card flex justify-between items-center flex-wrap"
          style={{ gridArea: "stats" }}>
          <TitleInfo title="Телеграм" info="@biskwiq" />
          <TitleInfo title="Возраст" info="18 лет" />
        </div>
        <div
          className="bg-bg-primary rounded-lg p-4 gap-3 card flex justify-between items-center"
          style={{ gridArea: "skills" }}></div>
        <div
          className="bg-bg-primary rounded-lg p-4 gap-3 card flex justify-between items-center"
          style={{ gridArea: "about" }}>
          <TitleInfo
            title="О себе"
            info="Родился и живу в Москве. Начал заниматься программированием c 5 класса на Quick Basic. Любовь к автоматизации и созданию красивых, интуитивных интерфейсов. Еще очень люблю английский язык."
          />
        </div>
      </main>
    </div>
  );
});

export default Profile;
