import LogoSvg from "@/assets/logo.svg";
import { NavLink, useLocation } from "react-router-dom";
import SignOutSvg from "@/assets/signout.svg";

const NavItem = ({ children, to, currentRoute }: { children: React.ReactNode; to: string; currentRoute: string }) => {
  const isActive = currentRoute === to;
  return (
    <div className="flex flex-col items-center gap-2">
    <NavLink to={to} className={`px-[12px] py-[10px] text-sm rounded-[4px] text-text-secondary hover:text-text-primary transition-colors ${isActive ? "bg-bg-tetriary" : ""}`}>{children}</NavLink>
    </div>
  );
}
const Heading = () => {
  const currentRoute = useLocation().pathname;
  return (
    <header className="w-full h-[60px] flex items-center px-4 bg-bg-primary text-text-primary gap-[24px] absolute top-0 left-0">
      <LogoSvg width={64} height={24} />
      <div className="flex flex-grow justify-between items-center gap-4">
      <div className="flex items-center gap-2">
        <NavItem to={"/myteam"} currentRoute={currentRoute}>Моя команда</NavItem>
        <NavItem to={"/profile"} currentRoute={currentRoute}>Профиль</NavItem>
        <NavItem to={"/hackathons"} currentRoute={currentRoute}>Хакатоны</NavItem>
        </div>
        <div className="flex items-center gap-3">
          <div id="avatar" className="w-[40px] h-[40px] rounded-full bg-bg-secondary"></div>
          <div className="flex flex-col">
            <div className="text-sm">Женя Пригожин</div>
            <div className="text-xs text-text-secondary">3000 снарядов</div>
          </div>
          <button onClick={() => {}}><SignOutSvg width={24} height={24} /></button>
        </div>
      </div>
    </header>
  );
};

export default Heading;
