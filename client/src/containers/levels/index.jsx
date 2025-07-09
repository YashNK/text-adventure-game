import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { LevelDataForm, UpdateLevelData } from "./level-data";
import { LevelSideBar } from "../../components/level-sidebar";
import { useFetchApi } from "../../hooks/use-fetch-api";
import { apiRoutes } from "../../constants/api-routes";
import { SendIcon } from "../../assets/svgs/send-icon";
import { Loader } from "../../plugins/loader";
import "./levels.scss";

export const Levels = () => {
  const navigate = useNavigate();
  const chatRef = useRef(null);
  const { storyId, chapterId } = useParams();
  const { currentUser } = useOutletContext();
  const { fetchData, data: levelApiData, isSuccess, isLoading } = useFetchApi();
  const {
    fetchData: fetchCharacters,
    data: UserCharacterData,
    isLoading: fetchCharacterLoading,
  } = useFetchApi();
  const [levelData, setLevelData] = useState(LevelDataForm());
  const [command, setCommand] = useState("");
  const [conversationLog, setConversationLog] = useState([]);
  const [sceneIndex, setSceneIndex] = useState(3);

  //Get Level and Character Details
  useEffect(() => {
    if (currentUser) {
      fetchData(`${apiRoutes.LEVEL}/${chapterId}`, "GET");
      fetchCharacters(
        `${apiRoutes.USER_STORY}/users/${currentUser.userId}/story/${storyId}/character`,
        "GET"
      );
    }
  }, [currentUser]);

  //Set level State
  useEffect(() => {
    if (levelApiData && isSuccess) {
      const updatedLevel = UpdateLevelData(levelApiData[0]);
      setLevelData(updatedLevel);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (
      levelData &&
      levelData.sceneIds &&
      levelData.sceneIds.length > sceneIndex &&
      levelData.sceneIds[sceneIndex]
    ) {
      const currentScene = levelData.sceneIds[sceneIndex];
      if (currentScene.sceneMessage) {
        setConversationLog((prevLog) => [
          ...prevLog,
          `Echo: ${currentScene.sceneMessage}`,
        ]);
      }
      console.log(currentScene);
      if (
        currentScene.sceneResponseIds &&
        currentScene.sceneResponseIds.length > 0
      ) {
        currentScene.sceneResponseIds.map((res, resIndex) => (
          <span onClick={() => setSceneIndex(res.nextSceneId)}>
            {setConversationLog((prevLog) => [
              ...prevLog,
              `${resIndex + 1}: ${res.responseOption}`,
            ])}
          </span>
        ));
      }
    }
  }, [levelData, sceneIndex]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [conversationLog]);

  const handleDirectionCommand = (command, key) => {
    if (command.includes(key)) {
      if (levelData.sceneIds[sceneIndex].sceneOptionId?.[key]) {
        setConversationLog([
          ...conversationLog,
          `You: ${command}`,
          `Echo: You move ${key}.`,
        ]);
        const nextLevel = levelApiData.find(
          (l) =>
            l.levelId === levelData.sceneIds[sceneIndex].sceneOptionId?.[key]
        );
        setLevelData(nextLevel);
      } else {
        setConversationLog([
          ...conversationLog,
          `You: ${command}`,
          "Echo: You can not go that way",
        ]);
      }
    }
  };

  const handleCommand = () => {
    const filteredCommand = command.toLowerCase().trim();
    if (filteredCommand && filteredCommand.includes("look")) {
      const lookMessage =
        `Echo: ${levelData?.sceneIds[sceneIndex]?.sceneOptionId?.look}` ||
        "Echo: There's nothing to see here.";
      setConversationLog([...conversationLog, `You: ${command}`, lookMessage]);
    } else if (filteredCommand) {
      if (levelData.scene && levelData.sceneIds[sceneIndex].hasMonster) {
        setConversationLog([
          ...conversationLog,
          `You: ${command}`,
          "Echo: A monster blocks your path. Use Attack to kill monster.",
        ]);
      } else {
        if (
          filteredCommand.includes("north") ||
          filteredCommand.includes("south") ||
          filteredCommand.includes("east") ||
          filteredCommand.includes("west")
        ) {
          const directions = ["north", "south", "east", "west"];
          const direction = directions.find((dir) =>
            filteredCommand.includes(dir)
          );
          if (direction) {
            handleDirectionCommand(filteredCommand, direction);
          }
        } else {
          setConversationLog([
            ...conversationLog,
            `You: ${command}`,
            "Echo: Invalid command.",
          ]);
        }
      }
    }
    setCommand("");
  };

  return (
    <div className="level_container">
      {conversationLog.length === 0 ? (
        <Loader />
      ) : (
        <>
          <div className="level_content main_card_container">
            <div ref={chatRef} className="conversation_log flex_1_1_10">
              {conversationLog
                .slice()
                .reverse()
                .map((entry, index) => {
                  const startsWithYou = entry.startsWith("You:");
                  return (
                    <div className="conversation" key={index}>
                      <div
                        className={`${
                          startsWithYou ? "users_log" : "echo_log"
                        }`}
                      >
                        {entry}
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="level_input_container">
              <input
                className="level_input"
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCommand()}
                placeholder="Type your command (e.g., look, north)..."
              />
              <span onClick={() => handleCommand()}>
                <SendIcon />
              </span>
            </div>
          </div>
          <LevelSideBar
            currentUser={currentUser}
            levelTitle={levelData?.levelTitle}
            levelMessage={levelData?.levelMessage}
            UserCharacterData={UserCharacterData}
          />
        </>
      )}
    </div>
  );
};
