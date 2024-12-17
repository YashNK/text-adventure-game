import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useFetchApi } from "../../hooks/use-fetch-api";
import { apiRoutes } from "../../constants/api-routes";
import "./levels.scss";
import { createNewPath } from "../../utils";
import { Page } from "../../constants/routes";
import { DropDownArrow } from "../../assets/svgs/dropdown-arrow";
import { showCharacter } from "../../utils/show-image";

export const Levels = () => {
  const navigate = useNavigate();
  const chatRef = useRef(null);
  const { chapterId } = useParams();
  const { currentUser } = useOutletContext();
  const { fetchData, data: levelData, isSuccess } = useFetchApi();
  const { fetchData: UserCharacterApi, data: UserCharacterData } =
    useFetchApi();
  const [currentLevelId, setCurrentLevelId] = useState(0);
  const [command, setCommand] = useState("");
  const [conversationLog, setConversationLog] = useState([]);
  const [openSideBar, setOpenSidebar] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const currentLevel = levelData?.find(
    (level) => level.levelId === currentLevelId
  );
  const currentScene = currentLevel?.scene;
  const sceneOption = currentScene?.sceneOptions?.[0];

  useEffect(() => {
    fetchData(`${apiRoutes.LEVEL}/${chapterId}`, "GET");
    UserCharacterApi(
      `${apiRoutes.USER_STORY}/users/1/stories/1/character`,
      "GET"
    );
  }, []);

  useEffect(() => {
    if (levelData && isSuccess) {
      const initialLevelId = levelData[0]?.levelId;
      setCurrentLevelId(initialLevelId);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (currentScene) {
      setConversationLog([
        ...conversationLog,
        `Echo: ${currentScene?.sceneMessage}`,
      ]);
    }
  }, [currentScene]);

  useEffect(() => {
    if (currentScene) {
      if (sceneOption.startNewChapter > 0) {
        setConversationLog([...conversationLog, `Echo: Chapter Completed`]);
      }
    }
  }, [currentScene]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [conversationLog]);

  const handleCommand = () => {
    const filteredCommand = command.toLowerCase().trim();
    if (filteredCommand) {
      if (filteredCommand.includes("look")) {
        const lookMessage =
          `Echo: ${sceneOption?.look}` || "Echo: There's nothing to see here.";
        setConversationLog([
          ...conversationLog,
          `You: ${command}`,
          lookMessage,
        ]);
      } else if (filteredCommand.includes("north")) {
        if (sceneOption?.north) {
          setConversationLog([
            ...conversationLog,
            `You: ${command}`,
            "Echo: You move north.",
          ]);
          setCurrentLevelId(sceneOption.north);
        } else {
          setConversationLog([
            ...conversationLog,
            `You: ${command}`,
            "Echo: You can not go that way",
          ]);
        }
      } else if (filteredCommand.includes("south")) {
        if (sceneOption?.south) {
          setConversationLog([
            ...conversationLog,
            `You: ${command}`,
            "Echo: You move north.",
          ]);
          setCurrentLevelId(sceneOption.south);
        } else {
          setConversationLog([
            ...conversationLog,
            `You: ${command}`,
            "Echo: You can not go that way",
          ]);
        }
      } else if (filteredCommand.includes("east")) {
        if (sceneOption?.east) {
          setConversationLog([
            ...conversationLog,
            `You: ${command}`,
            "Echo: You move east.",
          ]);
          setCurrentLevelId(sceneOption.east);
        } else {
          setConversationLog([
            ...conversationLog,
            `You: ${command}`,
            "Echo: You can not go that way",
          ]);
        }
      } else if (filteredCommand.includes("west")) {
        if (sceneOption?.west) {
          setConversationLog([
            ...conversationLog,
            `You: ${command}`,
            "Echo: You move west.",
          ]);
          setCurrentLevelId(sceneOption.west);
        } else {
          setConversationLog([
            ...conversationLog,
            `You: ${command}`,
            "Echo: You can not go that way",
          ]);
        }
      } else {
        setConversationLog([
          ...conversationLog,
          `You: ${command}`,
          "Echo: Invalid command.",
        ]);
      }
    }
    setCommand("");
  };

  const handleNextChapter = () => {
    if (sceneOption && sceneOption.startNewChapter > 0) {
      navigate(
        createNewPath(Page.LEVEL, {
          chapterId: sceneOption.startNewChapter,
        })
      );
      fetchData(`${apiRoutes.LEVEL}/${sceneOption.startNewChapter}`, "GET");
      setConversationLog([]);
    }
  };

  const handleSidebarToggle = () => {
    setOpenSidebar(!openSideBar);
  };

  return (
    <div className="level_container">
      <div className="level_content main_card_container">
        <div ref={chatRef} className="conversation_log flex_1_1_10">
          {conversationLog
            .slice()
            .reverse()
            .map((entry, index) => (
              <div className="conversation" key={index}>
                {entry}
              </div>
            ))}
        </div>
        <div className="flex">
          <input
            className="level_input"
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCommand()}
            placeholder="Type your command (e.g., look, north)..."
          />
        </div>
      </div>
      <div
        className={`${
          openSideBar ? "mobile_sidebar_closed" : "mobile_sidebar_open"
        } level_sidebar main_card_container`}
      >
        <div className="character_container">
          <div className="flex items-center justify-between pb-1">
            <div className="flex_1_1_10 capitalize">
              {currentUser?.username}
            </div>
            <div className="flex_1_1_10 flex items-center justify-end">
              <span className="pr-2">Level 1</span>
              <div
                onClick={() => handleSidebarToggle()}
                className={`dropdown_container pr-1 ${
                  openSideBar ? "" : "closed"
                }`}
              >
                <DropDownArrow />
              </div>
            </div>
          </div>
          <div className="overflow-auto">
            <div>
              <div
                className={`character_details ${
                  openSideBar
                    ? "character_details_open"
                    : "character_details_closed"
                }`}
              >
                <div>Character Name: {UserCharacterData?.name}</div>
                <div>Health: {UserCharacterData?.health}</div>
                <div>Attack Power: {UserCharacterData?.attackPower}</div>
                <div>Special Ability: {UserCharacterData?.specialAbility}</div>
                <div>
                  Character Description: {UserCharacterData?.description}
                </div>
                <div className="character_image_container">
                  <img
                    className="character_image"
                    src={showCharacter(UserCharacterData?.avatar)}
                  />
                </div>
              </div>
              <button
                onClick={() => handleSidebarToggle()}
                className="primary_btn w-full my-3 min_width_120"
              >
                {openSideBar
                  ? "View Character Description"
                  : "Close Character Description"}
              </button>
            </div>
            <div
              className={`tab_main_container ${
                openSideBar ? "mobile_tabs_hidden" : "mobile_tabs_show"
              }`}
            >
              <div className="tab_container">
                <div
                  onClick={() => setSelectedTab(0)}
                  className={`tab_header ${
                    selectedTab === 0 ? "selected" : ""
                  }`}
                >
                  Scene
                </div>
                <div
                  onClick={() => setSelectedTab(1)}
                  className={`tab_header ${
                    selectedTab === 1 ? "selected" : ""
                  }`}
                >
                  Inventory
                </div>
                <div
                  onClick={() => setSelectedTab(2)}
                  className={`tab_header ${
                    selectedTab === 2 ? "selected" : ""
                  }`}
                >
                  Stats
                </div>
              </div>
              <div className="selected_tab_container">
                {selectedTab === 0 ? (
                  <div className="font_12 pb-3">
                    Location: {currentLevel?.levelTitle}
                    <div>{currentLevel?.levelMessage}</div>
                  </div>
                ) : (
                  ""
                )}
                {selectedTab === 1 ? <div>Inventory</div> : ""}
                {selectedTab === 2 ? <div>Stats</div> : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
