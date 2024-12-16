export const CreateCharacterResponse = (Character) => {
  return {
    characterId: Character.characterId,
    name: Character.name,
    health: Character.health,
    attackPower: Character.attackPower,
    specialAbility: Character.specialAbility,
    description: Character.description,
    avatar: Character.avatar,
  };
};
