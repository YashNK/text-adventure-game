import { Outlet } from "react-router-dom";
import { Header } from "../../components/header";
import { useEffect } from "react";
import { useFetchApi } from "../../hooks/use-fetch-api";
import { apiRoutes } from "../../constants/api-routes";
import "./main-container.scss";

export const MainContainer = () => {
  const { fetchData } = useFetchApi();

  useEffect(() => {
    fetchData(apiRoutes.CURRENT_USER, "GET");
  }, []);

  return (
    <div className="main_container">
      <Header />
      <Outlet />
    </div>
  );
};
