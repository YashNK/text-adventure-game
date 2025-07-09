export const CreateAndUpdateSceneOptionResponse = (sceneOption) => {
  return {
    sceneOptionId: sceneOption.sceneOptionId,
    look: sceneOption.look,
    west: sceneOption.west,
    north: sceneOption.north,
    east: sceneOption.east,
    attackMonsterId: sceneOption.attackMonsterId,
    searchItemId: sceneOption.searchItemId,
    flee: sceneOption.flee,
  };
};
