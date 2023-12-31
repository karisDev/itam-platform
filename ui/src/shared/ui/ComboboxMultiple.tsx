import { Combobox, Transition } from "@headlessui/react";
import ChevronSvg from "@/assets/chevron.svg";
import CheckSvg from "@/assets/check.svg";
import { Fragment, useState } from "react";

interface ComboboxMultipleProps {
  value: string[];
  onChange: (value: string[]) => void;
  options: readonly string[];
  label?: string;
  placeholder?: string;
  fixStupidBug?: boolean;
}

const ComboboxMultiple = (p: ComboboxMultipleProps) => {
  const [query, setQuery] = useState("");
  const [inputFocued, setInputFocued] = useState(false);
  const [firstFocus, setFirstFocus] = useState(false);

  const filterefOptions =
    query === ""
      ? p.options
      : p.options.filter((option) =>
          option.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, ""))
        );
  const placeholder = p.value.join(", ");

  return (
    <Combobox value={p.value} multiple onChange={p.onChange}>
      <div className="relative text-sm">
        {p.label && <Combobox.Label className="text-text-secondary">{p.label}</Combobox.Label>}
        <div className="relative h-fit flex items-center bg-input-bg hover:bg-input-hover transition-colors duration-200 w-full border-border-primary border rounded-md">
          <Combobox.Input
            className="bg-transparent h-10 outline-none px-4 py-2 w-full cursor-pointer pr-8 text-ellipsis"
            placeholder={placeholder}
            autoFocus={false}
            onFocus={(e) => {
              if (p.fixStupidBug && !firstFocus) {
                setFirstFocus(true);
                e.target.blur();
                return;
              }
              setInputFocued(true);
              setQuery("");
            }}
            onBlur={() => setInputFocued(false)}
            displayValue={(value: string[]) => (inputFocued ? "" : value.join(", "))}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button className="h-5 w-5 absolute right-2 text-text-secondary">
            <ChevronSvg />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100 delay-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          show={inputFocued}
          afterLeave={() => setQuery("")}>
          <Combobox.Options
            className="absolute border border-border-primary z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-bg-secondary py-1"
            style={{
              scrollbarWidth: "thin"
            }}>
            {filterefOptions.length === 0 && query !== "" ? (
              <div className="px-4 py-2 text-text-secondary">Ничего не найдено</div>
            ) : (
              filterefOptions.map((option) => (
                <Combobox.Option
                  key={option}
                  value={option}
                  className="mx-1 p-2 cursor-pointer rounded-md hover:bg-bg-tetriary flex justify-between">
                  {({ selected }) => (
                    <>
                      <span>{option}</span>
                      {selected && <CheckSvg className="w-5 h-5" />}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
            {}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};

export default ComboboxMultiple;
