import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./base.css";
import "./transitions.scss";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import LoginView from "../pages/Login";

export const App = () => {
  const location = useLocation();
  return (
    <div className="bg-bg-primary text-text-primary w-full h-full flex flex-col">
      <SwitchTransition>
        <CSSTransition key={location.key} classNames="fade" timeout={300} unmountOnExit>
          <Routes location={location}>
            {/* <Route index element={<Navigate to="upload" />} /> */}
            <Route path="/dashboard" element={<LoginView />} />
            <Route path="/login" element={<div>Not test</div>} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
};
