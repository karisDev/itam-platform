import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./base.css";
import "./transitions.scss";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import LoginView from "../pages/Login";
import PrivateRoute from "@/hoc/PrivateRoute";
import Heading from "@/components/Heading";
import Profile from "../pages/Profile";
import { TeamPage } from "../pages/myteam/teamPage";
import FinishRegistrationDialog from "@/components/FinishRegistrationDialog";
import Hackathons from "../pages/Hackathons";

export const App = () => {
  const location = useLocation();
  return (
    <div className="bg-bg-secondary text-text-primary text-sm w-full h-full flex flex-col">
      <FinishRegistrationDialog />
      <Heading />
      <SwitchTransition>
        <CSSTransition key={location.key} classNames="fade" timeout={300} unmountOnExit>
          <Routes location={location}>
            {/* <Route index element={<Navigate to="upload" />} /> */}
            <Route path="/login" element={<LoginView />} />
            <Route
              path="/hackathons"
              element={
                <PrivateRoute>
                  <Hackathons />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/myteam"
              element={
                <PrivateRoute>
                  <TeamPage />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/profile" />} />
          </Routes>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
};
