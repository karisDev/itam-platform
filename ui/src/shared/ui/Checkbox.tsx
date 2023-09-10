import { Switch } from "@headlessui/react";
import CheckSvg from "@/assets/check.svg";
import { twMerge } from "tailwind-merge";
import { useState } from "react";

interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  children: React.ReactNode;
  bordered?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = (p) => {
  const [checked, setChecked] = useState(false);

  const isChecked = p.checked ?? checked;
  return (
    <Switch
      className={twMerge(
        "flex gap-2 items-center",
        p.bordered &&
          "border border-border-primary rounded-md p-3 bg-input-bg hover:bg-bg-secondary transition-colors duration-200"
      )}
      checked={isChecked}
      onChange={(checked) => {
        if (p.onChange) p.onChange(checked);
        else setChecked(checked);
      }}>
      <div
        className={twMerge(
          "w-6 h-6 min-w-[24px] min-h-[24px] border border-border-primary bg-input-hover rounded-md flex items-center justify-center text-bg-primary",
          isChecked ? "bg-white" : "",
          p.bordered && "w-5 h-5min-w-[20px] min-h-[20px] rounded-[4px] border-text-primary/30"
        )}>
        {isChecked && <CheckSvg className="w-5 h-5" />}
      </div>
      <span className="text-sm">{p.children}</span>
    </Switch>
  );
};

export default Checkbox;
