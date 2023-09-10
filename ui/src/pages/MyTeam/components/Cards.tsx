import { Button } from "@/ui/Button";

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
  value: string;
}
export const Stats = (x: IStats) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-sm font-medium text-text-secondary">{x.title}</div>
      <div className="text-base font-medium">{x.value}</div>
    </div>
  );
};
