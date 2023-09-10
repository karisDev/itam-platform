import { Input } from "@/ui/Input";
import SearchSvg from "@/assets/search.svg";
import Separator from "@/ui/Separator";
import Collapsible from "@/ui/Collapsible";
import Checkbox from "@/ui/Checkbox";
import { Competences, Roles } from "@/components/FinishRegistrationDialog";
import ComboboxMultiple from "@/ui/ComboboxMultiple";
import Table from "./components/table";
import { Button } from "@/ui/Button";
import { observer } from "mobx-react-lite";
import UsersStore from "./users.vm";
import CheckSvg from "@/assets/check.svg";

const UsersPage = observer(() => {
  const data = UsersStore.items;
  return (
    <main className="w-full flex flex-col pb-8">
      <div className="max-w-screen-max mx-auto w-full mt-12 px-6">
        <h1 className="text-4xl">Участники</h1>
        <p className="text-text-secondary mt-3">Найдите участников для вашей команды</p>
        <div
          className="mt-12 grid gap-10"
          style={{
            gridTemplateColumns: "auto 1fr"
          }}>
          <div className="flex flex-col">
            <h3 className="font-bold text-xl h-8">Фильтры</h3>
            <Input
              className="mt-4"
              placeholder="Поиск по ФИО"
              icon={<SearchSvg className="text-text-secondary" width={20} height={20} />}
            />
            <Separator />
            <Collapsible title="Направленеие">
              <div className="flex flex-col gap-2">
                {Roles.map((role) => (
                  <Checkbox bordered key={role}>
                    {role}
                  </Checkbox>
                ))}
              </div>
            </Collapsible>
            <div className="my-2" />
            <ComboboxMultiple
              onChange={() => {}}
              options={Competences}
              value={["JavaScript", "PHP", "Git"]}
              label="Стэк"
            />
          </div>
          <div className="">
            <h2 className="font-bold text-2xl h-8">Список пользователей</h2>
            <Table
              data={data}
              rowKey={(row) => row.user.id}
              columns={[
                {
                  title: "ФИО",
                  render: (row) => row.user.fullname,
                  style: {
                    minWidth: "260px"
                  }
                },
                {
                  title: "Роль",
                  render: (row) => row.profile.positions.join(", ")
                },
                {
                  title: "Стэк",
                  render: (row) => row.profile.competences.join(", "),
                  style: {
                    width: "100%"
                  }
                },
                {
                  title: "Очное участие",
                  render: (row) =>
                    row.profile.ready_to_move ? <CheckSvg className="w-7 h-7 ml-3" /> : null
                },
                {
                  title: "Действия",
                  render: () => (
                    <Button appearance="primary" className="w-fit">
                      Пригласить
                    </Button>
                  )
                }
              ]}
            />
          </div>
        </div>
      </div>
    </main>
  );
});

export default UsersPage;
