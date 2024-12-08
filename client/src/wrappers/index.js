import React from "react";
import { Navigate } from "react-router-dom";
import { Page } from "../constants/routes";

export const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("TOKEN");
  if (token) {
    return <Navigate to={Page.DASHBOARD} />;
  }
  return children;
};

export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("TOKEN");
  if (!token) {
    return <Navigate to={Page.BASE} />;
  }
  return children;
};
