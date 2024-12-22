export const LevelDataForm = () => {
  return {
    levelId: 0,
    levelTitle: "",
    levelMessage: "",
    isLastLevel: false,
    scene: LevelDataFormScene(),
  };
};

export const LevelDataFormScene = () => {
  return {
    sceneId: 0,
    sceneMessage: "",
    hasMonster: false,
    sceneOptions: LevelDataFormSceneSceneOptions(),
  };
};

export const LevelDataFormSceneSceneOptions = () => {
  return {
    sceneOptionId: 0,
    look: "",
    north: 0,
    south: 0,
    east: 0,
    west: 0,
    attack: 0,
    search: 0,
    startNewChapter: 0,
  };
};

export const UpdateLevelData = (level) => {
  return {
    levelId: level?.levelId,
    levelTitle: level?.levelTitle,
    levelMessage: level?.levelMessage,
    isLastLevel: level?.isLastLevel,
    scene: {
      sceneId: level.scene.sceneId,
      sceneMessage: level.scene.sceneMessage,
      hasMonster: level.scene.hasMonster,
      sceneOptions: {
        sceneOptionId: level.scene.sceneOptions.sceneOptionId,
        look: level.scene.sceneOptions?.look,
        north: level.scene.sceneOptions?.north,
        south: level.scene.sceneOptions?.south,
        east: level.scene.sceneOptions?.east,
        west: level.scene.sceneOptions?.west,
        attack: level.scene.sceneOptions?.attack,
        search: level.scene.sceneOptions?.search,
        startNewChapter: level.scene.sceneOptions?.startNewChapter,
      },
    },
  };
};
