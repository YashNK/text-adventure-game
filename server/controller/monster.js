import Monster from "../model/monster.js";
import sendResponse from "../utility/utility.js";

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
    return sendResponse(res, 201, "Monster created successfully", newMonster);
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
