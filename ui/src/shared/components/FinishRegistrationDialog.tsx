import AuthStore from "@/stores/AuthStore";
import DialogBase from "@/dialogs/DialogBase";
import { Input } from "@/ui/Input";
import { useEffect, useState } from "react";
import ComboboxMultiple from "@/ui/ComboboxMultiple";
import SelectableChip from "./SelectableChip";
import { observer } from "mobx-react-lite";
import Checkbox from "@/ui/Checkbox";

export const COMPETENCES = [
  "JavaScript",
  "PHP",
  "Git",
  "MySQL",
  "Linux",
  "SQL",
  "Python",
  "Java",
  "ООП",
  "PostgreSQL",
  "Node.js",
  "MongoDB",
  "Yii framework",
  "Ajax",
  "Django",
  "Nginx",
  ".Net",
  "Docker",
  "Высоконагруженные системы",
  "Ruby on Rails",
  "Redis",
  "Laravel",
  "ASP.NET",
  "Ruby",
  "Data Science",
  "Machine Learning",
  "Deep Learning",
  "C++",
  "C#"
];

const Section = ({
  children,
  title,
  subtitle
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}) => (
  <>
    <div className="py-2">
      <h3 className="text-xl">{title}</h3>
      <p className="text-text-secondary mt-1 text-sm">{subtitle}</p>
    </div>
    {children}
  </>
);

export const Roles = ["Фронтенд", "Бэкенд", "Машинное обучение", "DevOps", "Дизайнер", "Менеджер"];

const FinishRegistrationDialog = observer(() => {
  const [canceled, setCanceled] = useState(false);
  const [competences, setCompetences] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [readyToMove, setReadyToMove] = useState(true);

  const toggleRole = (role: string) => {
    if (roles.includes(role)) {
      setRoles((prev) => prev.filter((r) => r !== role));
    } else {
      setRoles((prev) => [...prev, role]);
    }
  };

  const onFinishRegistration = async () => {
    await AuthStore.finishRegistration({
      positions: roles,
      competences,
      description,
      ready_to_move: readyToMove
    });
  };

  useEffect(() => {
    if (AuthStore.auth) {
      setCanceled(false);
    }
  }, [AuthStore.auth]);

  return (
    <DialogBase
      coolBlur
      width={650}
      isOpen={!canceled && AuthStore.authState === "unfinished"}
      confirmText="Я в игре!"
      onCancel={() => setCanceled(true)}
      onConfirm={onFinishRegistration}
      title="Заверши регистрацию"
      subtitle="Для полного доступа к сервису расскажи о своих умениях">
      <form
        autoFocus={false}
        className="grid gap-x-4 gap-y-8 text-md"
        style={{
          gridTemplateColumns: "0.6fr 1fr"
        }}>
        <Section title="Роль" subtitle="Твои задачи во время хакатонов">
          <div className="flex flex-wrap gap-2">
            {Roles.map((role) => (
              <SelectableChip
                key={role}
                selected={roles.includes(role)}
                onClick={() => toggleRole(role)}>
                {role}
              </SelectableChip>
            ))}
          </div>
        </Section>
        <Section title="Стек">
          <ComboboxMultiple
            fixStupidBug
            options={COMPETENCES}
            value={competences}
            onChange={setCompetences}
          />
        </Section>
        <Section title="Обо мне" subtitle="Хочешь что-то добавить?">
          <Input
            multiline
            name="description"
            placeholder="Фронтендер-фрилансер, очень люблю хакатоны"
            value={description}
            onChange={(v) => setDescription(v)}
          />
        </Section>
        <span></span>
        <Checkbox checked={readyToMove} onChange={(v) => setReadyToMove(v)}>
          Хочу участвовать очно
        </Checkbox>
      </form>
    </DialogBase>
  );
});

export default FinishRegistrationDialog;
