import React from "react";
import { Page } from "../../constants/routes";
import { useNavigate } from "react-router-dom";

export const ForbiddenPage = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center pt-10">
      <h1>Access Forbidden</h1>
      <div>
        Your session has expired or you don't have permission to access this
        page.
      </div>
      <label
        onClick={() => navigate(Page.LOGIN)}
        className="text-green-500 cursor-pointer"
      >
        Go to Login
      </label>
    </div>
  );
};
