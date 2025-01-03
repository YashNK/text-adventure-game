import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../components/header";
import { useEffect } from "react";
import { useFetchApi } from "../../hooks/use-fetch-api";
import { apiRoutes } from "../../constants/api-routes";
import "./main-container.scss";

export const MainContainer = () => {
  const { fetchData, data: currentUser } = useFetchApi();

  useEffect(() => {
    fetchData(`${apiRoutes.USER}/current-user`, "GET");
  }, []);

  return (
    <div className="main_container">
      <Header />
      <Outlet context={{ currentUser }} />
    </div>
  );
};
