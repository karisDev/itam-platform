import { Switch } from "@headlessui/react";
import CheckSvg from "@/assets/check.svg";
import { twMerge } from "tailwind-merge";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: React.ReactNode;
}

const Checkbox: React.FC<CheckboxProps> = (p) => {
  return (
    <Switch
      className="flex gap-2 items-center"
      checked={p.checked}
      onChange={(checked) => p.onChange(checked)}>
      <div
        className={twMerge(
          "w-6 h-6 border border-border-primary bg-input-hover rounded-md flex items-center justify-center text-bg-primary",
          p.checked ? "bg-white" : ""
        )}>
        {p.checked && <CheckSvg className="w-5 h-5" />}
      </div>
      <span className="text-sm">{p.children}</span>
    </Switch>
  );
};

export default Checkbox;
