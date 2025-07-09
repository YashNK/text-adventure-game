export const CreateAndUpdateMonsterResponse = (monster) => {
  return {
    monsterId: monster.monsterId,
    monsterName: monster.monsterName,
    monsterHealth: monster.monsterHealth,
    monsterDamage: monster.monsterDamage,
    attackMessage: monster.attackMessage,
    monsterAvatar: monster.monsterAvatar,
    rewardXp: monster.rewardXp,
    rewardMoney: monster.rewardMoney,
    rewardItemId: monster.rewardItemId,
  };
};
