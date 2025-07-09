import Scene from "../model/scene.js";
import Level from "../model/level.js";
import sendResponse from "../utility/utility.js";
import { CreateAndUpdateSceneResponse } from "../dto/scene/index.js";
import SceneOption from "../model/sceneOption.js";
import Response from "../model/response.js";

export const CreateScene = async (req, res) => {
  try {
    const { levelId } = req.params;
    const {
      sceneMessage,
      sceneOptionId,
      hasMonster,
      monsterName,
      hasNextScene,
      sceneResponseIds,
    } = req.body;
    const level = await Level.findOne({ levelId });
    if (!level) {
      return sendResponse(res, 404, "Level not found");
    }
    if (!sceneOptionId) {
      return sendResponse(res, 404, "SceneOptionId is required");
    }
    if (!sceneResponseIds) {
      return sendResponse(res, 404, "SceneResponseIds is required");
    }
    const sceneOption = await SceneOption.findOne({ sceneOptionId });
    if (!sceneOption) {
      return sendResponse(
        res,
        404,
        `SceneOption with ID: ${sceneOptionId} not found`
      );
    }
    const sceneResponse = await Response.find({
      responseId: { $in: sceneResponseIds },
    });
    if (
      sceneResponse.length === 0 ||
      sceneResponse.length !== sceneResponseIds.length
    ) {
      return sendResponse(res, 404, "Scene Response ID(s) not found");
    }
    const newScene = new Scene({
      sceneMessage,
      sceneOptionId,
      hasMonster,
      monsterName,
      hasNextScene: hasNextScene || sceneResponseIds.length > 0 ? true : false,
      sceneResponseIds: sceneResponseIds || [],
    });
    await newScene.save();
    level.sceneIds.push(newScene.sceneId);
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

export const UpdateScene = async (req, res) => {
  try {
    const { sceneId } = req.params;
    const {
      sceneMessage,
      sceneOptionId,
      hasMonster,
      monsterName,
      hasNextScene,
      sceneResponseIds,
    } = req.body;
    const scene = await Scene.findOne({ sceneId });
    if (!scene) {
      return sendResponse(res, 404, `Scene with ID: ${sceneId} not found`);
    }
    if (!sceneOptionId) {
      return sendResponse(res, 404, "SceneOptionId is required");
    }
    if (!sceneResponseIds) {
      return sendResponse(res, 404, "SceneResponseIds is required");
    }
    const sceneOption = await SceneOption.findOne({ sceneOptionId });
    if (!sceneOption) {
      return sendResponse(
        res,
        404,
        `SceneOption with ID: ${sceneOptionId} not found`
      );
    }
    const sceneResponse = await Response.find({
      responseId: { $in: sceneResponseIds },
    });
    if (
      sceneResponse.length === 0 ||
      sceneResponse.length !== sceneResponseIds.length
    ) {
      return sendResponse(res, 404, "Scene Response ID(s) not found");
    }
    const updatedScene = await Scene.findOneAndUpdate(
      { sceneId },
      {
        sceneMessage,
        sceneOptionId,
        hasMonster,
        monsterName,
        hasNextScene,
        sceneResponseIds,
      },
      {
        new: true,
        runValidators: true,
      }
    );
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
