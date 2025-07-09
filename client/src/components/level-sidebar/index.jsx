import { useEffect, useState } from "react";
import { DropDownArrow } from "../../assets/svgs/dropdown-arrow";
import { showCharacter } from "../../utils/show-data";
import "./level-sidebar.scss";

export const LevelSideBar = ({
  currentUser,
  UserCharacterData,
  levelTitle,
  levelMessage,
}) => {
  const [open, setOpen] = useState({
    tab: 0,
    sidebar: true,
  });

  useEffect(() => {
    if (currentUser) {
    }
  }, [currentUser]);

  const handleSidebarToggle = () => {
    setOpen((prev) => ({ ...prev, sidebar: !open.sidebar }));
  };

  return (
    <div
      className={`${
        open.sidebar ? "mobile_sidebar_closed" : "mobile_sidebar_open"
      } level_sidebar main_card_container`}
    >
      <div className="character_container">
        <div className="flex items-center justify-between pb-1">
          <div className="flex_1_1_10 capitalize">{currentUser?.username}</div>
          <div className="flex_1_1_10 flex items-center justify-end">
            <span className="pr-2">Level 1</span>
            <div
              onClick={() => handleSidebarToggle()}
              className={`dropdown_container pr-1 ${
                open.sidebar ? "closed" : ""
              }`}
            >
              <DropDownArrow />
            </div>
          </div>
        </div>
        <div className="flex flex-col flex_1_1_10">
          <div>
            <div
              className={`character_details ${
                open.sidebar
                  ? "character_details_open"
                  : "character_details_closed"
              }`}
            >
              <div>Character Name: {UserCharacterData?.characterName}</div>
              <div>Health: {UserCharacterData?.characterHealth}</div>
              <div>Attack Power: {UserCharacterData?.attackPower}</div>
              <div>Special Ability: {UserCharacterData?.specialAbility}</div>
              <div>
                Character Description: {UserCharacterData?.characterDescription}
              </div>
              <div className="character_image_container">
                <img
                  className="character_image"
                  src={showCharacter(UserCharacterData?.characterAvatar)}
                />
              </div>
            </div>
            <button
              onClick={() => handleSidebarToggle()}
              className="primary_btn w-full my-3 min_width_120"
            >
              {open.sidebar
                ? "View Character Description"
                : "Close Character Description"}
            </button>
          </div>
          <div
            className={`tab_main_container flex_1_1_10 ${
              open.sidebar ? "mobile_tabs_hidden" : "mobile_tabs_show"
            }`}
          >
            <div className="tab_container">
              <div
                onClick={() => setOpen((prev) => ({ ...prev, tab: 0 }))}
                className={`tab_header ${open.tab === 0 ? "selected" : ""}`}
              >
                Scene
              </div>
              <div
                onClick={() => setOpen((prev) => ({ ...prev, tab: 1 }))}
                className={`tab_header ${open.tab === 1 ? "selected" : ""}`}
              >
                Inventory
              </div>
              <div
                onClick={() => setOpen((prev) => ({ ...prev, tab: 2 }))}
                className={`tab_header ${open.tab === 2 ? "selected" : ""}`}
              >
                Stats
              </div>
            </div>
            <div className="selected_tab_container">
              {open.tab === 0 ? (
                <div className="font_12 pb-3">
                  Location: {levelTitle}
                  <div>{levelMessage}</div>
                </div>
              ) : (
                ""
              )}
              {open.tab === 1 ? <div>Inventory</div> : ""}
              {open.tab === 2 ? <div>Stats</div> : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
