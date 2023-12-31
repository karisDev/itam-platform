import { observer } from "mobx-react-lite";
import { Navigate } from "react-router-dom";
import React from "react";
import AuthStore from "@/stores/AuthStore";

const PrivateRoute: React.FC<React.PropsWithChildren<unknown>> = observer(({ children }) => {
  const { authState } = AuthStore;

  if (authState === "loading") return null;
  if (authState === "anonymous") return <Navigate to="/login" />;
  return children;
});

export default PrivateRoute;
