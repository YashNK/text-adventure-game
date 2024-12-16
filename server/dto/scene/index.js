export const CreateSceneResponse = (scene) => {
  return {
    sceneId: scene.sceneId,
    sceneMessage: scene.sceneMessage,
    sceneOptions: scene.sceneOptions,
  };
};
