import React from "react";
import { useNavigate } from "react-router-dom";
import { Page } from "../../constants/routes";
import "./header.scss";
import { LOGOUT_ICON } from "../../assets/svgs/logout-icon";
import I18 from "../../plugins/i18";

export const Header = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.clear();
    navigate(Page.LOGIN);
  };

  return (
    <div className="header_container">
      <span
        className="cursor-pointer primary_color font_16"
        onClick={() => navigate(Page.DASHBOARD)}
      >
        <I18 tkey="ECHO_VERSE" />
      </span>
      <span className="cursor-pointer" onClick={() => handleLogOut()}>
        <LOGOUT_ICON />
      </span>
    </div>
  );
};
