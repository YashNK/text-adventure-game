import React, { useState, useEffect, useRef } from "react";
import {
  currentLevelId,
  currentSceneId as initialSceneId,
  setLocalStorageValue,
  useLevelData,
} from "../../assets/constants/userDetails";
import "./levels.css";

export const Levels = () => {
  const { level } = useLevelData();
  const [gameState, setGameState] = useState({
    currentSceneId: initialSceneId,
    userInput: "",
    monsterHealth: null,
    conversationLog: [],
  });
  const logEndRef = useRef(null);

  useEffect(() => {
    setLocalStorageValue("SCENE", gameState.currentSceneId);
    setLocalStorageValue("LEVEL", currentLevelId);
  }, [gameState.currentSceneId]);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [gameState.conversationLog]);

  const currentScene = level?.scene.find(
    (scene) => scene.sceneId === gameState.currentSceneId
  );

  useEffect(() => {
    if (currentScene) {
      setGameState((prevState) => ({
        ...prevState,
        conversationLog: [
          ...prevState.conversationLog,
          `Game: ${currentScene.sceneMessage}`,
        ],
      }));
    }
  }, [currentScene]);

  const addToConversationLog = (message) => {
    setGameState((prevState) => ({
      ...prevState,
      conversationLog: [...prevState.conversationLog, message],
    }));
  };

  const handleLook = () => {
    const lookOption = currentScene?.sceneOptions.find((opt) => opt.look);
    addToConversationLog(
      `You: look\nGame: ${lookOption?.look || "Nothing of interest here."}`
    );
  };

  const handleMove = (direction) => {
    const directionOption = currentScene?.sceneOptions.find(
      (opt) => opt[direction]
    );
    if (directionOption) {
      setGameState((prevState) => ({
        ...prevState,
        currentSceneId: directionOption[direction],
      }));
    } else {
      addToConversationLog(
        `You: go ${direction}\nGame: You can't go that way.`
      );
    }
  };

  const handleAttack = () => {
    const attackOption = currentScene?.sceneOptions.find((opt) => opt.attack);
    if (!attackOption)
      return addToConversationLog("Game: Nothing to attack here.");

    const { monsterName = "The monster", monsterHealth: initialHealth } =
      attackOption.attack[0];

    setGameState((prevState) => {
      const newMonsterHealth =
        prevState.monsterHealth === null
          ? initialHealth
          : prevState.monsterHealth - 10;

      return {
        ...prevState,
        monsterHealth: newMonsterHealth <= 0 ? 0 : newMonsterHealth,
        conversationLog: [
          ...prevState.conversationLog,
          `You: attack\nGame: You attack ${monsterName}! It now has ${newMonsterHealth} health remaining.`,
        ],
      };
    });

    if (gameState.monsterHealth <= 0 && gameState.monsterHealth !== null) {
      addToConversationLog(`Game: ${monsterName} has been defeated!`);
    }
  };

  const handleFlee = () => {
    const fleeOption = currentScene?.sceneOptions.find((opt) => opt.flee);
    if (fleeOption) {
      setGameState((prevState) => ({
        ...prevState,
        currentSceneId: fleeOption.flee,
        conversationLog: [
          ...prevState.conversationLog,
          "You: flee\nGame: You fled the scene!",
        ],
      }));
    } else {
      addToConversationLog("You: flee\nGame: No need to flee.");
    }
  };

  const handleNewChapter = (command) => {
    const newChapterOption = currentScene?.sceneOptions.find(
      (opt) => opt.startNewChapter
    );
    if (newChapterOption) {
      setLocalStorageValue("CHAPTER", 2);
      setGameState({
        currentSceneId: initialSceneId,
        userInput: "",
        monsterHealth: null,
        conversationLog: [],
      });
      addToConversationLog("Game: You have started Chapter 2!");
    } else {
      addToConversationLog(
        "You: start new chapter\nGame: This option is not available in the current scene."
      );
    }
  };

  const commandMap = {
    look: handleLook,
    west: () => handleMove("west"),
    east: () => handleMove("east"),
    south: () => handleMove("south"),
    north: () => handleMove("north"),
    attack: handleAttack,
    "start new chapter": () => handleNewChapter("start new chapter"),
    flee: handleFlee,
  };

  const handleUserInput = () => {
    const command = gameState.userInput.trim().toLowerCase();
    const commandHandler = Object.keys(commandMap).find((cmd) =>
      command.includes(cmd)
    );
    if (commandHandler) {
      commandMap[commandHandler]();
    } else {
      addToConversationLog(
        "Game: Invalid command. Try 'look', 'go west', 'attack', etc."
      );
    }
    setGameState((prevState) => ({ ...prevState, userInput: "" }));
  };

  return (
    <div className="h-full flex flex-col justify-between p-4 text-green-500 font-mono">
      <div className="mb-2">
        <div className="text-lg font-bold uppercase text-green-400">
          {level?.levelTitle}
        </div>
        <div className="text-sm text-green-300">{level?.levelMessage}</div>
      </div>
      <div className="conversation-log flex-1 mb-4 overflow-y-auto px-4 py-2 rounded border border-gray-900 flex flex-col-reverse">
        <div ref={logEndRef} />
        {gameState.conversationLog
          .slice()
          .reverse()
          .map((entry, index) => (
            <div key={index} className="text-sm whitespace-pre-line">
              {entry}
            </div>
          ))}
      </div>
      <div className="mt-2">
        {gameState.monsterHealth !== null && (
          <div className="text-sm text-red-500 mb-2">
            Monster Health:{" "}
            {gameState.monsterHealth > 0 ? gameState.monsterHealth : "Defeated"}
          </div>
        )}
        <input
          autoFocus
          type="text"
          className="w-full p-2 bg-gray-800 text-green-500 rounded border border-gray-700 placeholder-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
          placeholder="Type a command (e.g., 'look', 'go west', 'attack')"
          value={gameState.userInput}
          onChange={(e) =>
            setGameState((prevState) => ({
              ...prevState,
              userInput: e.target.value,
            }))
          }
          onKeyDown={(e) => e.key === "Enter" && handleUserInput()}
        />
      </div>
    </div>
  );
};
