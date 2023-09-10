import LinkSvg from "@/assets/link.svg";
import DialogBase from "@/dialogs/DialogBase";
import { Button } from "@/ui/Button";
import TitleInfo from "@/ui/TitleInfo";
import { EventResult } from "api/endpoints/EventEndpoint";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

const testEvent = {
  id: 1,
  title: "Hack.Genesis_ONLINE_",
  date_event: "29-31 января 2021",
  date_registration: "до 27 января 2021",
  prize: "100 000 рублей!",
  target: "разработчики, дизайнеры, продуктологи, аналитики",
  image_url: "https://static.tildacdn.com/tild6431-3038-4763-a538-306365363363/-FOmqDc-FOg.jpg"
};

const MARKDOWN = `
## Присоединайтесь к AI News Hack – хакатону по разработке ИИ-сервисов! 

1. AI Open News приглашает вас на хакатон по искусственному интеллекту. Компания создаёт бота, который помогает избавиться от информационного шума. Вместо чтения большого количества каналов, подписчики бота получают все главные новости в одном месте.

2. Призовой фонд хакатона 500 000 рублей!

3. Не упустите возможность проявить свой потенциал и стать частью  команды!

🔍 Задача на хакатоне: Разработка сервиса удаления дубликатов и классификации новостей

👥 Приглашаются IT-специалисты, дата-сайентисты, эксперты по нейросетям и искусственному интеллекту, а также продакт-менеджеры. Присоединяйтесь к команде единомышленников и продолжите работу над инновационным продуктом.

💡 На хакатоне вы сможете проверить свои навыки, найти новых единомышленников и показать свою сообразительность. Лучшим участникам будет предложен контракт или возможность трудоустройства для продолжения работы над проектом.
`;

const HackCard = ({ item }: { item: EventResult }) => {
  const [expanded, setExpanded] = useState(false);
  const hack = item;

  return (
    <>
      <div
        className="appear flex cursor-pointer border-border-primary border rounded-md flex-col hover:border-text-primary transition-all duration-200 h-full"
        onClick={() => setExpanded(true)}>
        <div className="flex h-48 relative rounded-t-md overflow-hidden">
          <img
            className="object-cover w-full h-full"
            src={hack?.image_url ?? testEvent.image_url}
            alt={hack?.title ?? testEvent.title}
          />
        </div>
        <div className="p-4 flex-1 flex flex-col gap-4">
          <h3 className="font-bold text-base">{hack.title}</h3>
          <ul className="text-text-secondary">
            <li>{hack.date_event}</li>
            <li className="capitalize mt-1">{hack.target}</li>
          </ul>
          <div className="flex justify-between mt-auto">
            <span>4 кейса</span>
            <LinkSvg className="text-text-secondary w-5 h-5" />
          </div>
        </div>
      </div>
      <DialogBase
        confirmText="Позвать команду"
        onConfirm={() => setExpanded(false)}
        title={hack?.title ?? "Хакатон"}
        subtitle={"Организатор: AI Open News"}
        isOpen={expanded}
        width={700}
        bottom={
          <Button appearance="secondary" className="w-fit self-end">
            Посетить сайт
            <LinkSvg className="ml-2 w-5 h-5" />
          </Button>
        }
        onCancel={() => setExpanded(false)}>
        <div className="flex flex-col">
          <div className="flex justify-between gap-6">
            <div className="flex relative overflow-hidden max-h-72 flex-1">
              <img
                className="object-cover w-full h-fit rounded-md max-h-72"
                src={hack?.image_url ?? testEvent.image_url}
                alt={hack.title ?? testEvent.title}
              />
            </div>

            <div className="flex flex-col justify-between flex-1/2 my-6 gap-6 max-w-[250px]">
              <TitleInfo title="Дата проведения" info={hack?.date_event} />
              <TitleInfo title="Призовые" info={hack?.prize} />
              <TitleInfo title="Регистрация" info={hack?.date_registration} />
            </div>
          </div>

          <div
            className="mt-6 prose prose-invert max-h-96 overflow-auto"
            style={{
              scrollbarWidth: "thin"
            }}>
            <ReactMarkdown>{MARKDOWN}</ReactMarkdown>
          </div>
        </div>
      </DialogBase>
    </>
  );
};

export default HackCard;
