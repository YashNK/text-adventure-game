import React from "react";
import { Navigate } from "react-router-dom";
import { Page } from "../constants/routes";
import { LocalStorageKeys } from "../constants";

export const PublicRoute = ({ children }) => {
  const token = localStorage.getItem(LocalStorageKeys.TOKEN);
  if (token) {
    return <Navigate to={Page.DASHBOARD} />;
  }
  return children;
};

export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem(LocalStorageKeys.TOKEN);
  if (!token) {
    return <Navigate to={Page.BASE} />;
  }
  return children;
};
