export const CreateAndUpdateSceneResponse = (scene) => {
  return {
    sceneId: scene.sceneId,
    sceneMessage: scene.sceneMessage,
    hasMonster: scene.hasMonster,
    sceneOptions: scene.sceneOptions,
  };
};
