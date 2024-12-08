import React from "react";
import { useNavigate } from "react-router-dom";
import { Page } from "../../constants/routes";
import "./header.scss";

export const Header = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.clear();
    navigate(Page.LOGIN);
  };

  return (
    <div className="header_container">
      <label className="cursor-pointer" onClick={() => handleLogOut()}>
        Logout
      </label>
    </div>
  );
};
