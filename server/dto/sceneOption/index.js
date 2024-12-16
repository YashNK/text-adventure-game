export const CreateSceneOptionResponse = (sceneOption) => {
  return {
    sceneOptionId: sceneOption.sceneOptionId,
    look: sceneOption.look,
    west: sceneOption.west,
    north: sceneOption.north,
    east: sceneOption.east,
    monster: sceneOption.monster,
    startNewChapter: sceneOption.startNewChapter,
  };
};
