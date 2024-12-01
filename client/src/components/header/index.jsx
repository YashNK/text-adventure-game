import React from "react";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../constants/paths";
import "./header.css";

export const Header = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.clear();
    navigate(Paths.LOGIN);
  };

  return (
    <div className="header_container">
      <label className="cursor-pointer" onClick={() => handleLogOut()}>
        Logout
      </label>
    </div>
  );
};
