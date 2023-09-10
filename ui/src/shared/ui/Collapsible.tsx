import { Disclosure } from "@headlessui/react";
import ChevronSvg from "@/assets/chevron2.svg";

const Collapsible = ({
  title,
  children
}: {
  title: string;
  children: JSX.Element[] | JSX.Element;
}) => {
  return (
    <Disclosure defaultOpen>
      {({ open }) => (
        <>
          <Disclosure.Button className={"w-full gap-3 flex items-center rounded-xl px-1.5 py-1"}>
            <ChevronSvg
              className="transform transition-transform duration-200 w-5 h-5"
              style={{
                transform: open ? "rotate(90deg)" : "rotate(0deg)"
              }}
            />
            <h3 className="">{title}</h3>
          </Disclosure.Button>
          <Disclosure.Panel className="mt-2">{children}</Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Collapsible;
