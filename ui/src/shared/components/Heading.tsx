import LogoSvg from "@/assets/logo.svg";
import { NavLink, useLocation } from "react-router-dom";
import SignOutSvg from "@/assets/signout.svg";
import AuthStore from "@/stores/AuthStore";
import { observer } from "mobx-react-lite";
import Avatar from "@/ui/Avatar";

const NavItem = ({
  children,
  to,
  currentRoute
}: {
  children: React.ReactNode;
  to: string;
  currentRoute: string;
}) => {
  const isActive = currentRoute.startsWith(to);
  return (
    <NavLink
      to={to}
      className={`px-[12px] py-[10px] text-sm rounded-[4px] ${
        isActive ? "bg-bg-tetriary text-text-primary" : "text-text-secondary"
      } hover:text-text-primary transition-colors`}>
      {children}
    </NavLink>
  );
};

const Heading = observer(() => {
  const currentRoute = useLocation().pathname;
  if (AuthStore.authState === "anonymous" || AuthStore.authState === "loading") return null;
  return (
    <header className="w-full min-h-[60px] slide-top flex items-center px-4 bg-bg-primary text-text-primary gap-[24px] border-b-[1px] border-border-primary">
      <NavLink to={"/"}>
        <LogoSvg width={64} height={24} />
      </NavLink>
      <div className="flex flex-grow justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <NavItem to={"/MyTeam"} currentRoute={currentRoute}>
            Моя команда
          </NavItem>
          <NavItem to={"/profile"} currentRoute={currentRoute}>
            Профиль
          </NavItem>
          <NavItem to={"/hackathons"} currentRoute={currentRoute}>
            Хакатоны
          </NavItem>
          <NavItem to={"/users"} currentRoute={currentRoute}>
            Участники
          </NavItem>
        </div>
        <div className="flex items-center gap-3">
          <Avatar />
          <div className="flex flex-col">
            <div className="text-sm">{AuthStore.auth?.fullname ?? "Хто я?"}</div>
            <div className="text-xs text-text-secondary">
              Рейтинг: {AuthStore.user?.rating ?? "отсутствует"}
            </div>
          </div>
          <button onClick={() => AuthStore.logout()}>
            <SignOutSvg
              className="text-text-secondary hover:text-text-primary"
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>
    </header>
  );
});

export default Heading;
