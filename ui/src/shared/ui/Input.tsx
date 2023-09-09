import { twMerge } from "tailwind-merge";
import ClearSvg from "@/assets/clear.svg";
import React from "react";

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  appearance?: "primary" | "accent";
  onChange?: (text: string) => void;
  error?: boolean;
  allowClear?: boolean;
  icon?: JSX.Element;
  rounded?: "lg" | "xl";
  label?: string;
}

export const Input: React.FC<InputProps> = ({
  appearance = "primary",
  onChange,
  className,
  error,
  icon,
  allowClear,
  label,
  ...rest
}) => {
  return (
    <div className={twMerge("w-full flex flex-col gap-1 relative", className)}>
      {label && (
        <label className="text-text-secondary text-sm" htmlFor={rest.id}>
          {label}
        </label>
      )}
      {icon && <div className="absolute left-3 pointer-events-none">{icon}</div>}
      <input
        className={twMerge(
          "w-full shadow-none box-border focus:shadow-md transition-all duration-200 px-3 h-10 rounded-md border-[1px] border-border-primary placeholder:text-text-secondary text-sm outline-none",
          icon ? "pl-14" : "",
          allowClear ? "pr-12" : "",
          appearance === "primary" ? "bg-input-bg hover:bg-input-hover focus:bg-input-hover" : ""
        )}
        style={{
          boxShadow: error ? "0 0 0 1px rgb(var(--colors-status-error))" : ""
        }}
        onChange={(e) => onChange?.(e.target.value)}
        {...rest}
      />
      {allowClear && rest.value && (
        <button
          className="absolute w-5 text-gray-500/50 right-4 focus:outline-none hover:text-gray-500/80"
          onClick={() => onChange?.("")}>
          <ClearSvg />
        </button>
      )}
    </div>
  );
};
