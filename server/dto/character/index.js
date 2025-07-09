export const CreateAndUpdateCharacterResponse = (character) => {
  return {
    characterId: character.characterId,
    characterName: character.characterName,
    characterDescription: character.characterDescription,
    characterClass: character.characterClass,
    characterMoney: character.characterMoney,
    characterXp: character.characterXp,
    attackPower: character.attackPower,
    characterHealth: character.characterHealth,
    characterDefense: character.characterDefense,
    specialAbility: character.specialAbility,
    characterAvatar: character.characterAvatar,
  };
};
