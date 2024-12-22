import Scene from "../model/scene.js";
import Level from "../model/level.js";
import SceneOption from "../model/sceneOption.js";
import sendResponse from "../utility/utility.js";
import { CreateAndUpdateSceneResponse } from "../dto/scene/index.js";

export const createScene = async (req, res) => {
  try {
    const { levelId } = req.params;
    const { sceneMessage, sceneOptions, hasMonster } = req.body;
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
      hasMonster,
    });
    await newScene.save();
    level.scene = newSceneId;
    await level.save();
    const response = CreateAndUpdateSceneResponse(newScene);
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

export const updateScene = async (req, res) => {
  try {
    const { sceneId } = req.params;
    const updateData = req.body;
    const updatedScene = await Scene.findOneAndUpdate({ sceneId }, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updatedScene) {
      return sendResponse(res, 404, `Scene with ID ${sceneId} not found`);
    }
    const response = CreateAndUpdateSceneResponse(updatedScene);
    return sendResponse(res, 200, "Scene updated successfully", response);
  } catch (error) {
    return sendResponse(
      res,
      400,
      "Failed to update Scene",
      null,
      1,
      error.message
    );
  }
};
