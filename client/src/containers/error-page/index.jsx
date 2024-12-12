import React from "react";
import { useNavigate } from "react-router-dom";
import { Page } from "../../constants/routes";

export const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center pt-10">
      <h1>404 Page Not Found</h1>
      <div>
        The page you&apos;re looking for doesn&apos;t exist or an error
        occurred.
      </div>
      <label
        onClick={() => navigate(Page.DASHBOARD)}
        className="text-green-500 cursor-pointer"
      >
        Go back to Home
      </label>
    </div>
  );
};
