import Scene from "../model/scene.js";
import Level from "../model/level.js";
import SceneOption from "../model/sceneOption.js";
import sendResponse from "../utility/utility.js";
import { CreateSceneResponse } from "../dto/scene/index.js";

export const createScene = async (req, res) => {
  try {
    const { levelId } = req.params;
    const { sceneMessage, sceneOptions } = req.body;
    const level = await Level.findOne({ levelId });
    if (!level) {
      return sendResponse(res, 404, "Level not found");
    }
    const validSceneOptions = await SceneOption.find({
      sceneOptionId: { $in: sceneOptions },
    });

    if (validSceneOptions.length !== sceneOptions.length) {
      return sendResponse(res, 404, "One or more scene options do not exist");
    }
    const maxScene = await Scene.findOne()
      .sort({ sceneId: -1 })
      .select("sceneId");
    const newSceneId = maxScene ? maxScene.sceneId + 1 : 1;
    const newScene = new Scene({
      sceneId: newSceneId,
      sceneMessage,
      sceneOptions,
    });
    await newScene.save();
    level.scene = newSceneId;
    await level.save();
    const response = CreateSceneResponse(newScene);
    return sendResponse(res, 201, "Scene created successfully", response);
  } catch (error) {
    return sendResponse(
      res,
      400,
      "Failed to create scene",
      null,
      1,
      error.message
    );
  }
};
