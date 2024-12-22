import Monster from "../model/monster.js";
import sendResponse from "../utility/utility.js";
import { CreateAndUpdateMonsterResponse } from "../dto/monster/index.js";

export const createMonster = async (req, res) => {
  try {
    const { monsterName, monsterHealth, monsterDamage, attackMessage } =
      req.body;
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

export const updateMonster = async (req, res) => {
  try {
    const { monsterId } = req.params;
    const updateData = req.body;
    const updatedMonster = await Monster.findOneAndUpdate(
      { monsterId },
      updateData,
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
