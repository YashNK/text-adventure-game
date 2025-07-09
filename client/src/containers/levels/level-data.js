export const LevelDataForm = () => {
  return {
    levelId: 0,
    levelTitle: "",
    levelMessage: "",
    isLastLevel: false,
    sceneIds: [LevelDataFormScene()],
  };
};

export const LevelDataFormScene = () => {
  return {
    sceneId: 0,
    hasMonster: false,
    monsterName: "",
    sceneResponses: [],
    hasNextScene: false,
    sceneOptionId: LevelDataFormSceneSceneOptions(),
    sceneResponseIds: [LevelDataFormSceneResponses()],
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
  };
};

export const LevelDataFormSceneResponses = () => {
  return {
    responseId: 0,
    responseOption: [],
    nextSceneId: 0,
  };
};

export const UpdateLevelData = (level) => {
  return {
    levelId: level?.levelId,
    levelTitle: level?.levelTitle,
    levelMessage: level?.levelMessage,
    isLastLevel: level?.isLastLevel,
    sceneIds: level?.sceneIds.map((scene) => ({
      sceneId: scene.sceneId,
      sceneMessage: scene.sceneMessage,
      hasMonster: scene.hasMonster,
      monsterName: scene.hasMonster,
      sceneResponses: scene.sceneResponses,
      hasNextScene: scene.hasNextScene,
      sceneOptionId: {
        sceneOptionId: scene.sceneOptionId?.sceneOptionId,
        look: scene.sceneOptionId?.look,
        north: scene.sceneOptionId?.north,
        south: scene.sceneOptionId?.south,
        east: scene.sceneOptionId?.east,
        west: scene.sceneOptionId?.west,
        attack: scene.sceneOptionId?.attack,
        search: scene.sceneOptionId?.search,
      },
      sceneResponseIds: {
        responseId: scene.sceneResponseIds?.responseId,
        responseOption: scene.sceneResponseIds?.responseOption,
        nextSceneId: scene.sceneResponseIds?.nextSceneId,
      },
    })),
  };
};
