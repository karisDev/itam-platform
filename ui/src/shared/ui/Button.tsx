import { twMerge } from "tailwind-merge";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  appearance?: "primary" | "secondary";
  fontSize?: "lg" | "xl" | "2xl";
}

export const Button: React.FC<ButtonProps> = ({
  className,
  appearance = "primary",
  fontSize = "xl",
  ...rest
}) => {
  return (
    <button
      // className={`${
      //   appearance === "primary"
      //     ? "bg-button-primary-bg hover:bg-button-primary-hover text-button-primary-text"
      //     : appearance === "secondary"
      //     ? "bg-bg-accent text-text-secondary hover:text-text-main"
      //     : "bg-bg-primary text-text-main hover:bg-bg-lighter"
      // } select-none shadow-sm duration-200 hover:shadow-md active:shadow-sm disabled:bg-bg-disabled transition-all text-${fontSize} font-medium rounded-md py-3 ${className}`}
      className={twMerge(
        "select-none h-12 w-full rounded-md transition-all py-3 font-medium",
        appearance === "primary"
          ? "bg-button-primary-bg hover:bg-button-primary-hover text-button-primary-text"
          : "bg-button-secondary-bg hover:bg-button-secondary-hover text-button-secondary-text",
        className
      )}
      {...rest}
    />
  );
};
