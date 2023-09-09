import { Button } from "@/ui/Button";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

{
  /* <CreateTeam
isOpen
setIsOpen={() => {}}
title="Создать команду"
confirmText="Создать"
onConfirm={() => {}}>
<div className="flex flex-col gap-3">
  <Input name="teamName" label="Название команды" required />
</div>
</CreateTeam> */
}

export default function DialogBase({
  isOpen,
  setIsOpen,
  children,
  title,
  onConfirm,
  confirmText
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: JSX.Element | JSX.Element[];
  title: string;
  onConfirm: () => void;
  confirmText: string;
}) {
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl text-text-primary bg-bg-primary border-border-primary border text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-xl font-medium p-6">
                  {title}
                </Dialog.Title>
                <Dialog.Description as="div" className="flex flex-col gap-3 px-6">
                  {children}
                </Dialog.Description>
                <div className="flex justify-between border-t-[1px] border-border-primary py-3 mt-6 px-6 bg-bg-secondary">
                  <Button appearance="secondary" onClick={closeModal} className="w-fit">
                    Отмена
                  </Button>
                  <Button appearance="primary" onClick={onConfirm} className="w-fit">
                    {confirmText}
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
