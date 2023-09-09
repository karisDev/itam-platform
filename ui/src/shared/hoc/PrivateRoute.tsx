import { observer } from "mobx-react-lite";
import { Navigate } from "react-router-dom";
import React from "react";
import AuthStore from "@/stores/AuthStore";
import Heading from "@/components/Heading.tsx";

const PrivateRoute: React.FC<React.PropsWithChildren<unknown>> = observer(({ children }) => {
  const { authState } = AuthStore;

  if (authState === "loading") return <></>;
  if (authState === "anonymous") return <Navigate to="/login" />;
  document.body.className = "bg-bg-secondary";
  return(
  <div className="w-full h-full flex bg-bg-secondary">
    <Heading />
    <main className="w-full h-full max-w-[940px] mx-auto flex flex-col gap-4 px-4 pt-[40px]" data-testid="main-content" data-cy="main-content">
      {children}
    </main>
  </div>
  );
});

export default PrivateRoute;
