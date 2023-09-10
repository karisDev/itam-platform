import { twMerge } from "tailwind-merge";

const Separator = ({ className }: { className?: string }) => {
  return <span className={twMerge("w-full h-[1px] bg-border-primary my-4", className)} />;
};

export default Separator;
