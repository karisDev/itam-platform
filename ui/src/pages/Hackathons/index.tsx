import { Input } from "@/ui/Input";
import SearchSvg from "@/assets/search.svg";
import Separator from "@/ui/Separator";
import Collapsible from "@/ui/Collapsible";
import HackCard from "./components/HackCard";
import Checkbox from "@/ui/Checkbox";

const Hackathons = () => {
  return (
    <main className="w-full flex flex-col pb-8">
      <div className="max-w-screen-max mx-auto w-full mt-12 px-6">
        <h1 className="text-4xl">Хакатоны</h1>
        <p className="text-text-secondary mt-3">
          Предложите вашей команде участие в одном из хакатонов
        </p>
        <div
          className="mt-12 grid gap-10"
          style={{
            gridTemplateColumns: "auto 1fr"
          }}>
          <div className="flex flex-col">
            <h3 className="font-bold text-xl h-8">Фильтры</h3>
            <Input
              className="mt-4"
              placeholder="Поиск по названию"
              appearance="accent"
              icon={<SearchSvg className="text-text-secondary" width={20} height={20} />}
            />
            <Separator />
            <Collapsible title="Направленеие">
              <div className="flex flex-col gap-2">
                <Checkbox bordered>Искуственный Интеллект</Checkbox>
                <Checkbox bordered>Блокчейн</Checkbox>
                <Checkbox bordered>Мобильная разработка</Checkbox>
                <Checkbox bordered>Веб-разработка</Checkbox>
                <Checkbox bordered>Интернет вещей</Checkbox>
                <Checkbox bordered>Разработка игр</Checkbox>
              </div>
            </Collapsible>
            <div className="my-2" />
            <Collapsible title="Призовые">
              <div className="flex flex-col gap-2">
                <Checkbox bordered>1 000 000+</Checkbox>
                <Checkbox bordered>500 000+</Checkbox>
                <Checkbox bordered>100 000+</Checkbox>
                <Checkbox bordered>50 000+</Checkbox>
                <Checkbox bordered>10 000+</Checkbox>
                <Checkbox bordered>Без призовых</Checkbox>
              </div>
            </Collapsible>
          </div>
          <div className="">
            <h2 className="font-bold text-2xl h-8">Рекомендовано вам</h2>
            <div
              className="grid gap-4 mt-4"
              style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
              <HackCard />
              <HackCard />
              <HackCard />
              <HackCard />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hackathons;
