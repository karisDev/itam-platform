import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./base.css";
import "./transitions.scss";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import LoginView from "../pages/Login";
import PrivateRoute from "@/hoc/PrivateRoute";

export const App = () => {
  const location = useLocation();
  return (
    <div className="bg-bg-primary text-text-primary text-sm w-full h-full flex flex-col">
      <SwitchTransition>
        <CSSTransition key={location.key} classNames="fade" timeout={300} unmountOnExit>
          <Routes location={location}>
            {/* <Route index element={<Navigate to="upload" />} /> */}
            <Route path="/login" element={<LoginView />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <div>Not test</div>
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
