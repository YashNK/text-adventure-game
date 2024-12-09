import React, { useState, useRef, useEffect } from "react";
import { GameData } from "../../constants/game";
import "./levels.scss";

export const Levels = () => {
  const GameState = { chapterId: 1, levelId: 1 };
  const chapter = GameData[0]?.chapters.find(
    (ch) => ch.chapterId === GameState.chapterId
  );
  const level = chapter?.levels.find(
    (lvl) => lvl.levelId === GameState.levelId
  );
  const [gameState, setGameState] = useState({
    chapterId: GameState.chapterId,
    levelId: GameState.levelId,
    sceneId: 1,
    userInput: "",
    monsterHealth: null,
    conversationLog: [],
  });
  const currentScene = level?.scene.find(
    (scene) => scene.sceneId === gameState.sceneId
  );
  const logEndRef = useRef(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [gameState.conversationLog]);

  useEffect(() => {
    if (currentScene) {
      setGameState((prevState) => ({
        ...prevState,
        conversationLog: [
          ...prevState.conversationLog,
          `Echo: ${currentScene.sceneMessage}`,
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
      `You: look\nEcho: ${lookOption?.look || "Nothing of interest here."}`
    );
  };

  const handleMove = (direction) => {
    const directionOption = currentScene?.sceneOptions.find(
      (opt) => opt[direction]
    );
    if (directionOption) {
      setGameState((prevState) => ({
        ...prevState,
        sceneId: directionOption[direction],
      }));
    } else {
      addToConversationLog(
        `You: go ${direction}\nEcho: You can't go that way.`
      );
    }
  };

  const handleAttack = () => {
    const attackOption = currentScene?.sceneOptions.find((opt) => opt.attack);
    if (!attackOption)
      return addToConversationLog("Echo: Nothing to attack here.");

    const { monsterName = "The monster", monsterHealth: initialHealth } =
      attackOption.attack[0];

    setGameState((prevState) => {
      if (prevState.monsterHealth === 0) {
        return prevState;
      } else {
        const newMonsterHealth =
          prevState.monsterHealth === null
            ? initialHealth
            : prevState.monsterHealth - 10;

        return {
          ...prevState,
          monsterHealth: newMonsterHealth < 0 ? 0 : newMonsterHealth,
          conversationLog: [
            ...prevState.conversationLog,
            `You: attack\nEcho: You attack ${monsterName}! It now has ${newMonsterHealth} health remaining.`,
          ],
        };
      }
    });

    if (gameState.monsterHealth <= 0 && gameState.monsterHealth !== null) {
      addToConversationLog(`Echo: ${monsterName} has been defeated!`);
    }
  };

  const handleFlee = () => {
    const fleeOption = currentScene?.sceneOptions.find((opt) => opt.flee);
    if (fleeOption) {
      setGameState((prevState) => ({
        ...prevState,
        sceneId: fleeOption.flee,
        conversationLog: [
          ...prevState.conversationLog,
          "You: flee\nEcho: You fled the scene!",
        ],
      }));
    } else {
      addToConversationLog("You: flee\nEcho: No need to flee.");
    }
  };

  const handleNewChapter = () => {
    const newChapterOption = currentScene?.sceneOptions.find(
      (opt) => opt.startNewChapter
    );
    if (newChapterOption) {
      localStorage.setItem(
        "GAME_DATA",
        JSON.stringify({
          chapterId: GameState.chapterId + 1,
          levelId: 1,
        })
      );
      setGameState({
        chapterId: GameState.chapterId,
        levelId: 1,
        sceneId: 1,
        userInput: "",
        monsterHealth: null,
        conversationLog: [],
      });
      addToConversationLog("Echo: You have started Chapter 2!");
    } else {
      addToConversationLog(
        "You: start new chapter\nEcho: This option is not available in the current scene."
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
    start: () => handleNewChapter("start"),
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
        "Echo: Invalid command. Try 'look', 'go west', 'attack', etc."
      );
    }
    setGameState((prevState) => ({ ...prevState, userInput: "" }));
  };

  return (
    <div className="level_container h-full flex flex-col justify-between p-4">
      <div className="mb-2">
        <div className="text-lg font-bold uppercase">{level?.levelTitle}</div>
        <div className="text-sm">{level?.levelMessage}</div>
      </div>
      <div className="conversation-log flex-1 mb-4 overflow-y-auto px-4 py-2 rounded border border-gray-900 flex flex-col-reverse">
        <div ref={logEndRef} />
        {gameState.conversationLog
          .slice()
          .reverse()
          .map((entry, index) => {
            const [youPart, echoPart] = entry.split("\n", 2);
            return (
              <div key={index} className="text-sm whitespace-pre-line">
                {youPart.includes("You") ? (
                  <div className="pt-3">{youPart}</div>
                ) : (
                  <div className="">{youPart}</div>
                )}
                {echoPart && <span className="">{echoPart}</span>}
              </div>
            );
          })}
      </div>
      <div className="mt-2">
        {gameState.monsterHealth !== null && (
          <div className="text-sm text-red-500 mb-2">
            Monster Health:{" "}
            {gameState.monsterHealth > 0 ? gameState.monsterHealth : "Defeated"}
          </div>
        )}
        <input
          type="text"
          className="level_input"
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
