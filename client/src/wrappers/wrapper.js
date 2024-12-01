import React from "react";
import { Navigate } from "react-router-dom";
import { Paths } from "../constants/paths";

export const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("TOKEN");
  if (token) {
    return <Navigate to={Paths.BASE} />;
  }
  return children;
};

export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("TOKEN");
  if (!token) {
    return <Navigate to={Paths.LOGIN} />;
  }
  return children;
};
