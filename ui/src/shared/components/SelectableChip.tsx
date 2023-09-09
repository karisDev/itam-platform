import { twMerge } from "tailwind-merge";
import CheckSvg from "@/assets/check.svg";

const SelectableChip = ({
  children,
  selected,
  onClick
}: {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
}) => (
  <div
    className={twMerge(
      "px-3 h-10 flex items-center border text-sm border-border-primary rounded-md py-1 hover:bg-button-secondary-hover cursor-pointer transition-colors duration-200 bg-button-secondary-bg gap-1 font-light",
      selected ? "bg-bg-tetriary hover:bg-bg-tetriary" : "",
      !onClick && "hover:bg-button-secondary-bg text-text-primary cursor-default"
    )}
    onClick={onClick}>
    {selected && <CheckSvg className="w-5 h-5" />}
    {children}
  </div>
);

export default SelectableChip;
