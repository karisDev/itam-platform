import AuthStore from "@/stores/AuthStore";
import TitleInfo from "@/ui/TitleInfo";
import { Participation } from "api/endpoints/ParticipationEndpoint";
import { observer } from "mobx-react-lite";
import { Button } from "@/ui/Button";
import LinkSvg from "@/assets/link.svg";
import { Input } from "@/ui/Input";
import { useState } from "react";
import teamPageVm from "../MyTeam/teamPage.vm";
import DialogBase from "@/dialogs/DialogBase";
import ReactMarkdown from "react-markdown";

const INSTRUCTIONS_MD = `
# Система начисления баллов за участие в хакатонах
---
## Хакатоны разделяются на следующие уровни:
- **Локальный**
- **Городской/Региональный**
- **Всероссийский/Международный**

---
## В соответствии с занятым местом участникам команды начисляются очки:
**Очки за место:**
- **1 место:** 100 очков
- **2 место:** 70 очков
- **3 место** или ниже, если оно было призовым: 40 очков
- **Участие:** 10 очков

---
## Очки, полученные командой, умножаются на коэффициент, который зависит от уровня хакатона:
**Коэффициенты для уровней хакатонов:**
- **Локальный:** 0.3
- **Городской/Региональный:** 0.6
- **Всероссийский/Международный:** 1

---

**Дополнительные коэффициенты:**

Если хакатон длится более 4 дней, то за каждый дополнительный день к коэффициенту можно добавлять 0.02.

---
`;

const AdminPage = observer(() => {
  const [showInstructions, setShowInstructions] = useState(false);
  return (
    <>
      <main className="w-full flex flex-col pb-8">
        <div className="bg-bg-primary w-full min-h-[128px] border-b-[1px] border-border-primary">
          <div className="max-w-screen-lg mx-auto w-full h-full flex items-center px-6 justify-between">
            <h2 className="text-[32px] font-normal">Админка</h2>
            <Button className="w-fit" onClick={() => setShowInstructions(true)}>
              Методичка
            </Button>
          </div>
        </div>
        <div className="max-w-screen-lg mx-auto w-full px-6 mt-12 flex flex-col">
          {AuthStore.participations
            ?.filter((p) => p.status === "На проверке модератором")
            .map((p) => <TeamCard key={p.id} item={p} />)}
        </div>
      </main>
      <DialogBase
        confirmText="Понял"
        onConfirm={() => setShowInstructions(false)}
        title="Методичка"
        width={800}
        isOpen={showInstructions}
        onCancel={() => setShowInstructions(false)}>
        <div
          className="mt-6 prose prose-invert max-h-[600px] w-full overflow-auto max-w-4xl"
          style={{
            scrollbarWidth: "thin"
          }}>
          <ReactMarkdown>{INSTRUCTIONS_MD}</ReactMarkdown>
        </div>
      </DialogBase>
    </>
  );
});

const TeamCard = observer(({ item }: { item: Participation }) => {
  const [score, setScore] = useState("");
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const onSubmit = async (ok: boolean) => {
    if (!ok) {
      await teamPageVm.finishParticipation(
        {
          participation_id: item.id,
          points: 0
        },
        ok
      );
      return;
    }
    // check number
    if (score.trim().length === 0 || isNaN(+score)) {
      setError(true);
      return;
    }
    setError(false);
    setDisabled(true);

    try {
      await teamPageVm.finishParticipation(
        {
          participation_id: item.id,
          points: +score
        },
        ok
      );
    } catch {
      setError(true);
    } finally {
      setDisabled(false);
    }
  };
  return (
    <div key={item.id} className="card gap-6 flex flex-col">
      <div className="flex gap-6">
        <TitleInfo title="Место" info={item.place} />
        <TitleInfo title="Комментарий" info={item.description} />
        <Button
          disabled={disabled}
          appearance="secondary"
          className="ml-auto w-fit min-h-[40px] py-1 h-fit"
          onClick={() => window.open(item.repo_url, "_blank")}>
          Посмотреть репозиторий
          <LinkSvg className="ml-2 w-5 h-5" />
        </Button>
      </div>
      <div className="flex gap-4 items-end">
        <Button appearance="secondary" className="mr-auto w-fit" onClick={() => onSubmit(false)}>
          Отклонить
        </Button>
        <Input
          disabled={disabled}
          error={error}
          label="Оценка"
          placeholder="5"
          className="ml-auto w-24"
          onChange={(v) => setScore(v)}
          value={score}
        />
        <Button appearance="primary" className="w-fit" onClick={() => onSubmit(true)}>
          Подтвердить
        </Button>
      </div>
    </div>
  );
});

export default AdminPage;
