import Scene from "../model/scene.js";
import SceneOption from "../model/sceneOption.js";
import Monster from "../model/monster.js";
import sendResponse from "../utility/utility.js";
import { CreateAndUpdateSceneOptionResponse } from "../dto/sceneOption/index.js";

export const createSceneOption = async (req, res) => {
  try {
    const { sceneId } = req.params;
    const { look, west, north, east, attack, startNewChapter } = req.body;
    const scene = await Scene.findOne({ sceneId });
    if (!scene) {
      return sendResponse(res, 404, "Scene not found");
    }
    const newSceneOption = new SceneOption({
      look,
      west,
      north,
      east,
      attack,
      startNewChapter,
    });
    await newSceneOption.save();
    scene.sceneOptions = newSceneOption.sceneOptionId;
    await scene.save();
    const response = CreateAndUpdateSceneOptionResponse(newSceneOption);
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

export const updateSceneOption = async (req, res) => {
  try {
    const { sceneOptionId } = req.params;
    const updateData = req.body;
    const updatedScene = await SceneOption.findOneAndUpdate(
      { sceneOptionId },
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedScene) {
      return sendResponse(
        res,
        404,
        `Scene Option with ID ${sceneOptionId} not found`
      );
    }
    const response = CreateAndUpdateSceneOptionResponse(updatedScene);
    return sendResponse(
      res,
      200,
      "Scene Option updated successfully",
      response
    );
  } catch (error) {
    return sendResponse(
      res,
      400,
      "Failed to update Scene Option",
      null,
      1,
      error.message
    );
  }
};
