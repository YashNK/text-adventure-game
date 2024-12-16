import Scene from "../model/scene.js";
import SceneOption from "../model/sceneOption.js";
import Monster from "../model/monster.js";
import sendResponse from "../utility/utility.js";
import { CreateSceneOptionResponse } from "../dto/sceneOption/index.js";

export const createSceneOption = async (req, res) => {
  try {
    const { sceneId } = req.params;
    const { look, west, north, east, attack, startNewChapter } = req.body;
    const scene = await Scene.findOne({ sceneId });
    if (!scene) {
      return sendResponse(res, 404, "Scene not found");
    }
    if (attack && attack.length > 0) {
      const validMonsters = await Monster.find({ monsterId: { $in: attack } });
      if (validMonsters.length !== attack.length) {
        return sendResponse(
          res,
          404,
          "One or more provided monsters are not valid"
        );
      }
    }
    const maxSceneOption = await SceneOption.findOne()
      .sort({ sceneOptionId: -1 })
      .select("sceneOptionId");
    const newSceneOptionId = maxSceneOption
      ? maxSceneOption.sceneOptionId + 1
      : 1;
    const newSceneOption = new SceneOption({
      sceneOptionId: newSceneOptionId,
      look,
      west,
      north,
      east,
      monster: attack,
      startNewChapter,
    });
    await newSceneOption.save();
    scene.sceneOptions.push(newSceneOptionId);
    await scene.save();
    const response = CreateSceneOptionResponse(newSceneOption);
    return sendResponse(res, 201, "SceneOption created successfully", response);
  } catch (error) {
    return sendResponse(
      res,
      400,
      "Failed to create scene option",
      null,
      1,
      error.message
    );
  }
};
