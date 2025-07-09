import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Page } from "../../constants/routes";
import { MENU_ICON } from "../../assets/svgs/menu-icon";
import Forest from "../../assets/images/forest-trees.webp";
import Grass from "../../assets/images/forest-grass.webp";
import { GlassButton } from "react-glass-ui";
import "./landing-page.scss";

export const LandingPage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const contentTwoRef = useRef(null);

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       setIsScrolled(entry.isIntersecting);
  //     },
  //     { threshold: 0.3 }
  //   );
  //   if (contentTwoRef.current) {
  //     observer.observe(contentTwoRef.current);
  //   }
  //   return () => {
  //     if (contentTwoRef.current) {
  //       observer.unobserve(contentTwoRef.current);
  //     }
  //   };
  // }, []);

  return (
    <div className="landing_page_container w-full">
      <div className={`landing_header ${isScrolled ? "scrolled" : ""}`}>
        <div className="font_30">EchoVerse</div>
        <div className="landing_page_header_btn_container">
          <GlassButton
            blur={4}
            className=""
            onClick={() => navigate(Page.LOGIN)}
          >
            Login
          </GlassButton>
          <button
            className="secondary_btn ml-2"
            onClick={() => navigate(Page.REGISTER)}
          >
            Register
          </button>
        </div>
        <div className="landing_page_header_menu_container">
          <span
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
          >
            <MENU_ICON />
          </span>
          <div
            className={`${
              isMenuOpen ? "open" : "closed"
            } landing_page_header_menu`}
          >
            <div
              onClick={() => {
                isMenuOpen ? navigate(Page.LOGIN) : "";
              }}
              className="menu_item"
            >
              Login
            </div>
            <div
              onClick={() => {
                isMenuOpen ? navigate(Page.REGISTER) : "";
              }}
              className="menu_item"
            >
              Register
            </div>
          </div>
        </div>
      </div>
      <div className="landing_page_content">
        <div className="landing_page_content_one">
          <img src={Forest} className="forest" />
          <img src={Grass} className="grass" />
          <div className="font_40">Welcome to</div>
          <div className="font_40">EchoVerse</div>
          <div className="py-4">
            <button
              className="primary_btn landing_btn mr-2"
              onClick={() => navigate(Page.LOGIN)}
            >
              Get Started
            </button>
          </div>
        </div>
        <div ref={contentTwoRef} className="landing_page_content_two"></div>
      </div>
    </div>
  );
};
