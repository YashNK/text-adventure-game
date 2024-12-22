export const CreateAndUpdateLevelResponse = (level) => {
  return {
    levelId: level.levelId,
    levelTitle: level.levelTitle,
    levelMessage: level.levelMessage,
    scene: level.scene,
    isLastLevel: level.isLastLevel,
  };
};

export const GetLevelsByChapterIdResponse = (levels) => {
  return levels.map((level) => ({
    levelId: level.levelId,
    levelTitle: level.levelTitle,
    levelMessage: level.levelMessage,
    scene: level.scene,
    isLastLevel: level.isLastLevel,
  }));
};
