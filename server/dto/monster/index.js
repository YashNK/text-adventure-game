export const CreateAndUpdateMonsterResponse = (monster) => {
  return {
    monsterId: monster.monsterId,
    monsterName: monster.monsterName,
    monsterHealth: monster.monsterHealth,
    monsterDamage: monster.monsterDamage,
    attackMessage: monster.attackMessage,
  };
};
