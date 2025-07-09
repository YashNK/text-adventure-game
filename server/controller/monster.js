import Monster from "../model/monster.js";
import sendResponse from "../utility/utility.js";
import { CreateAndUpdateMonsterResponse } from "../dto/monster/index.js";

export const CreateMonster = async (req, res) => {
  try {
    const {
      monsterName,
      monsterHealth,
      monsterDamage,
      attackMessage,
      monsterAvatar,
      rewardXp,
      rewardMoney,
      rewardItemId,
    } = req.body;
    if (!monsterName || !monsterHealth || !monsterDamage || !attackMessage) {
      return sendResponse(
        res,
        400,
        "All fields are required: monsterName, monsterHealth, monsterDamage, attackMessage"
      );
    }
    const newMonster = new Monster({
      monsterName,
      monsterHealth,
      monsterDamage,
      attackMessage,
      monsterAvatar,
      rewardXp,
      rewardMoney,
      rewardItemId,
    });
    await newMonster.save();
    const response = CreateAndUpdateMonsterResponse(newMonster);
    return sendResponse(res, 201, "Monster created successfully", response);
  } catch (error) {
    return sendResponse(
      res,
      400,
      "Failed to create monster",
      null,
      1,
      error.message
    );
  }
};

export const UpdateMonster = async (req, res) => {
  try {
    const { monsterId } = req.params;
    const {
      monsterName,
      monsterHealth,
      monsterDamage,
      attackMessage,
      monsterAvatar,
      rewardXp,
      rewardMoney,
      rewardItemId,
    } = req.body;
    const updatedMonster = await Monster.findOneAndUpdate(
      { monsterId },
      {
        monsterName,
        monsterHealth,
        monsterDamage,
        attackMessage,
        monsterAvatar,
        rewardXp,
        rewardMoney,
        rewardItemId,
      },
      { new: true, runValidators: true }
    );
    if (!updatedMonster) {
      return sendResponse(res, 404, `Monster with ID ${monsterId} not found`);
    }
    const response = CreateAndUpdateMonsterResponse(updatedMonster);
    return sendResponse(res, 200, "Monster updated successfully", response);
  } catch (error) {
    return sendResponse(
      res,
      400,
      "Failed to update Monster",
      null,
      1,
      error.message
    );
  }
};
