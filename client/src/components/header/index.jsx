import React from "react";
import { useNavigate } from "react-router-dom";
import { Page } from "../../constants/routes";
import { LOGOUT_ICON } from "../../assets/svgs/logout-icon";
import "./header.scss";

export const Header = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.clear();
    navigate(Page.LOGIN);
  };

  return (
    <div className="header_container">
      <span
        className="cursor-pointer font_16"
        onClick={() => navigate(Page.DASHBOARD)}
      >
        EchoVerse
      </span>
      <span className="cursor-pointer" onClick={() => handleLogOut()}>
        <LOGOUT_ICON />
      </span>
    </div>
  );
};
