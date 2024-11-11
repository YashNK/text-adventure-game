import { GameData } from "./game";

export const currentChapterId = parseInt(localStorage.getItem("CHAPTER")) || 1;
export const currentLevelId = parseInt(localStorage.getItem("LEVEL")) || 1;
export const currentSceneId = parseInt(localStorage.getItem("SCENE")) || 1;

export const story = GameData[0];

export const setLocalStorageValue = (key, value) => {
  localStorage.setItem(key, value);
};

export const useLevelData = () => {
  const chapter = story?.chapters.find(
    (ch) => ch.chapterId === currentChapterId
  );
  const level = chapter?.levels.find((lvl) => lvl.levelId === currentLevelId);
  return { level, chapter };
};
