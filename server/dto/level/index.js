export const CreateLevelResponse = (level) => {
  return {
    levelId: level.levelId,
    levelTitle: level.levelTitle,
    levelMessage: level.levelMessage,
    scene: level.scene,
    isLastLevel: level.isLastLevel,
  };
};
