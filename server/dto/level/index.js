export const GetLevelsByChapterIdResponse = (levels) => {
  return levels.map((level) => ({
    levelId: level.levelId,
    levelLocation: level.levelLocation,
    levelMessage: level.levelMessage,
    levelHint: level.levelHint,
    increaseXp: level.increaseXp,
    isLastLevel: level.isLastLevel,
    nextChapterId: level.nextChapterId,
    levelImage: level.levelImage,
    sceneIds: level.sceneIds,
  }));
};

export const CreateAndUpdateLevelResponse = (level) => {
  return {
    levelId: level.levelId,
    levelLocation: level.levelLocation,
    levelMessage: level.levelMessage,
    isLastLevel: level.isLastLevel,
    levelHint: level.levelHint,
    increaseX: level.increaseXp,
    nextChapterId: level.nextChapterId,
    levelImage: level.levelImage,
    sceneIds: level.sceneIds,
  };
};
