export const UserStoryResponse = (userStory) => {
  return {
    userId: userStory.userId,
    characterId: userStory.characterId,
    storyId: userStory.storyId,
    itemIds: userStory.itemIds,
    currentCharacterXp: userStory.currentCharacterXp,
    currentCharacterHealth: userStory.currentCharacterHealth,
    currentCharacterAttackPower: userStory.currentCharacterAttackPower,
    currentCharacterDefense: userStory.currentCharacterDefense,
    currentCharacterMoney: userStory.currentCharacterMoney,
  };
};

export const UserCharacterResponse = (character, userStory) => {
  return {
    characterId: character.characterId,
    characterName: character.characterName,
    characterDescription: character.characterDescription,
    characterClass: character.characterClass,
    specialAbility: character.specialAbility,
    characterAvatar: character.characterAvatar,
    characterMoney: userStory.currentCharacterMoney,
    characterXp: userStory.currentCharacterXp,
    attackPower: userStory.currentCharacterAttackPower,
    characterHealth: userStory.currentCharacterHealth,
    characterDefense: userStory.currentCharacterDefense,
  };
};
