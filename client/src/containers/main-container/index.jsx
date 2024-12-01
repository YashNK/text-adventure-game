import { Outlet } from "react-router-dom";
import { Header } from "../../components/header";
import "./main-container.css";

export const MainContainer = () => {
  return (
    <div className="main_container">
      <Header />
      <Outlet />
    </div>
  );
};
