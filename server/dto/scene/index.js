export const CreateAndUpdateSceneResponse = (scene) => {
  return {
    sceneId: scene.sceneId,
    sceneMessage: scene.sceneMessage,
    hasMonster: scene.hasMonster,
    sceneOptionId: scene.sceneOptionId,
    monsterName: scene.monsterName,
    hasNextScene: scene.hasNextScene,
    sceneResponseIds: scene.sceneResponseIds,
  };
};
