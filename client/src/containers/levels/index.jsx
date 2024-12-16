import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useFetchApi } from "../../hooks/use-fetch-api";
import { apiRoutes } from "../../constants/api-routes";
import "./levels.scss";
import { createNewPath } from "../../utils";
import { Page } from "../../constants/routes";

export const Levels = () => {
  const navigate = useNavigate();
  const { chapterId } = useParams();
  const { currentUser } = useOutletContext();
  const { fetchData, data: levelData, isSuccess } = useFetchApi();
  const { fetchData: UserCharacterApi, data: UserCharacterData } =
    useFetchApi();
  const [currentLevelId, setCurrentLevelId] = useState(0);
  const [command, setCommand] = useState("");
  const [conversationLog, setConversationLog] = useState([]);
  const [openSideBar, setOpenSidebar] = useState(false);
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

  const handleCommand = () => {
    if (command.includes("look")) {
      const lookMessage =
        `Echo: ${sceneOption?.look}` || "Echo: There's nothing to see here.";
      setConversationLog([...conversationLog, `You: ${command}`, lookMessage]);
    } else if (command.includes("north")) {
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
    } else if (command.includes("south")) {
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
    } else if (command.includes("east")) {
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
    } else if (command.includes("west")) {
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

  return (
    <div className="level_container">
      <div
        onClick={() => setOpenSidebar(!openSideBar)}
        className="level_sidebar main_card_container"
      >
        <div className="flex items-center justify-between">
          <span>{currentUser?.username}</span>
          <span>Level 1</span>
        </div>
        {openSideBar ? (
          <div>
            {" "}
            <div>Character Name: {UserCharacterData?.name}</div>
            <div>Health: {UserCharacterData?.health}</div>
            <div>Attack Power: {UserCharacterData?.attackPower}</div>
            <div>Special Ability: {UserCharacterData?.specialAbility}</div>
            <div>Character Description: {UserCharacterData?.description}</div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="level_content main_card_container">
        <div>
          <div className="font_12 pb-3">
            Location: {currentLevel?.levelTitle}
          </div>
          <div>{currentLevel?.levelMessage}</div>
        </div>
        <div className="conversation_log flex_1_1_10">
          {conversationLog.map((entry, index) => (
            <div key={index} style={{ margin: 0 }}>
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
          <button
            onClick={() => handleNextChapter()}
            className="primary_btn mx-2 min_width_120"
          >
            Next Chapter
          </button>
        </div>
      </div>
    </div>
  );
};
