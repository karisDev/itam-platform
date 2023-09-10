import { observer } from "mobx-react-lite";
import AuthStore from "@/stores/AuthStore.ts";
import { NoTeam } from "./components/NoTeam.tsx";
import { HaveTeam } from "./components/HaveTeam.tsx";

export const TeamPage = observer(() => {
  return !AuthStore.team ? <HaveTeam /> : <NoTeam />;
});
