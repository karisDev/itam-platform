import DialogBase from "@/dialogs/DialogBase";
import { Button } from "@/ui/Button";
import { Input } from "@/ui/Input";
import { Section } from "@/ui/Section";
import { useState } from "react";
import TeamPageViewModel from "../teamPage.vm";

interface MockInvite {
  name: string;
}

export const InviteCard = (x: MockInvite) => {
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

export const RequestCard = (x: MockInvite) => {
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

interface IStats {
  title: string;
  info: string;
}
export const Stats = (x: IStats) => {
  return (
    <div className="flex flex-col gap-2 align-center">
      <div className="text-sm font-medium text-text-secondary">{x.title}</div>
      <div className="text-sm font-medium">{x.info}</div>
    </div>
  );
};

interface EventProps {
  title: string;
  participationId: number;
}

export const SubmitEventResult: React.FC<EventProps> = (x) => {
  const [submitResultExpanded, setSubmitResultExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [place, setPlace] = useState("");
  const [repository, setRepository] = useState("");
  const [results, setResults] = useState("");
  const [error, setError] = useState(false);

  const submitResult = async () => {
    if (!place || !repository || !results) {
      setError(true);
      return;
    }

    setError(false);
    setLoading(true);
    try {
      await TeamPageViewModel.submitParticipation({
        participation_id: x.participationId,
        place,
        repo_url: repository,
        description: results
      });
      setSubmitResultExpanded(false);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const onCancel = () => {
    setSubmitResultExpanded(false);
    setError(false);
    setPlace("");
    setRepository("");
    setResults("");
  };

  return (
    <>
      <div className="relative flex h-[150px] mb-8">
        <div className="itam-gradient w-full h-full blur-md absolute left-0 right-0"></div>
        <div className="flex card items-center gap-4 absolute left-0 right-0 min-h-[150px] max-h-[150px]">
          <div className="flex flex-col">
            <h2 className="text-2xl">{x.title}</h2>
            <p className="text-text-secondary text-lg">Отправить результаты хакатона</p>
          </div>
          <div className="grid ml-auto">
            <Button onClick={() => setSubmitResultExpanded(true)}>Поделиться результатом</Button>
          </div>
        </div>
      </div>
      <DialogBase
        width={700}
        confirmDisabled={loading}
        onConfirm={submitResult}
        confirmText="Отправить"
        title="Отправить результаты хакатона"
        subtitle="Поздравляем с завршением хакатона! Поделись информацией о вашем проекте."
        isOpen={submitResultExpanded}
        onCancel={onCancel}>
        <div
          className="grid gap-x-4 gap-y-8 text-md"
          style={{
            gridTemplateColumns: "0.6fr 1fr"
          }}>
          <Section title="Место">
            <Input
              error={error}
              value={place}
              onChange={(v) => setPlace(v)}
              placeholder="Финалист, 4 место"
            />
          </Section>
          <Section title="Репозиторий">
            <Input
              error={error}
              value={repository}
              onChange={(v) => setRepository(v)}
              placeholder="https://github.com/karisDev/itam-platform"
            />
          </Section>
          <Section
            title="Результаты"
            subtitle="В краткой форме опиши что могло бы помочь определить количество очков">
            <Input
              error={error}
              value={results}
              onChange={(v) => setResults(v)}
              multiline
              placeholder="Количество участников, полученные умения"
            />
          </Section>
        </div>
      </DialogBase>
    </>
  );
};
