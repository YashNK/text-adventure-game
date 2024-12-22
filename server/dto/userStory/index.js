export const SetUserCharacterResponse = (userStory) => {
  return {
    userStoryId: 6,
    userId: userStory.userId,
    storyId: userStory.storyId,
    characterId: userStory.characterId,
    itemIds: userStory.itemIds,
  };
};

export const GetUserCharacterResponse = (character) => {
  return {
    characterId: character.characterId,
    name: character.name,
    description: character.description,
    health: character.health,
    attackPower: character.attackPower,
    specialAbility: character.specialAbility,
    avatar: character.avatar,
  };
};
