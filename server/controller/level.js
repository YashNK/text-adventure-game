import Chapter from "../model/chapter.js";
import Level from "../model/level.js";
import Scene from "../model/scene.js";
import SceneOption from "../model/sceneOption.js";
import sendResponse from "../utility/utility.js";
import {
  CreateAndUpdateLevelResponse,
  GetLevelsByChapterIdResponse,
} from "../dto/level/index.js";
import { CreateAndUpdateSceneResponse } from "../dto/scene/index.js";
import { CreateAndUpdateSceneOptionResponse } from "../dto/sceneOption/index.js";
import Response from "../model/response.js";
import { CreateAndUpdateResponse } from "../dto/response/index.js";

export const CreateLevel = async (req, res) => {
  try {
    const { chapterId } = req.params;
    const {
      levelLocation,
      levelMessage,
      levelHint,
      increaseXp,
      isLastLevel,
      nextChapterId,
      levelImage,
      sceneIds,
    } = req.body;
    const chapter = await Chapter.findOne({ chapterId });
    if (!chapter) {
      return sendResponse(res, 404, "Chapter not found");
    }
    const validScenes = await Scene.find({ sceneId: { $in: sceneIds } });
    if (validScenes.length !== sceneIds.length) {
      return sendResponse(res, 404, "Scene ID(s) not found");
    }
    const newLevel = new Level({
      levelLocation,
      levelMessage,
      levelHint,
      isLastLevel,
      increaseXp,
      nextChapterId,
      levelImage,
      sceneIds,
    });
    await newLevel.save();
    chapter.levelIds.push(newLevel.levelId);
    await chapter.save();
    const response = CreateAndUpdateLevelResponse(newLevel);
    return sendResponse(res, 200, "Level created successfully", response);
  } catch (error) {
    return sendResponse(
      res,
      400,
      "Failed to create level",
      null,
      1,
      error.message
    );
  }
};

export const GetLevelsByChapterId = async (req, res) => {
  try {
    const { chapterId } = req.params;
    const chapter = await Chapter.findOne({ chapterId }).lean();
    if (!chapter) {
      return sendResponse(res, 404, "Chapter not found", null, 1);
    }
    const levels = await Level.find({
      levelId: { $in: chapter.levelIds },
    }).lean();
    const updatedLevels = await Promise.all(
      levels.map(async (level) => {
        if (level.sceneIds?.length > 0) {
          const scenes = await Scene.find({
            sceneId: { $in: level.sceneIds },
          }).lean();
          const updatedScenes = await Promise.all(
            scenes.map(async (scene) => {
              const sceneOption = scene.sceneOptionId
                ? await SceneOption.findOne({
                    sceneOptionId: scene.sceneOptionId,
                  }).lean()
                : null;
              const updatedSceneOption = sceneOption
                ? CreateAndUpdateSceneOptionResponse(sceneOption)
                : null;
              const responses =
                scene.sceneResponseIds?.length > 0
                  ? await Response.find({
                      responseId: { $in: scene.sceneResponseIds },
                    }).lean()
                  : [];
              const updatedResponses =
                responses.length > 0
                  ? responses.map(CreateAndUpdateResponse)
                  : [];
              return CreateAndUpdateSceneResponse({
                ...scene,
                sceneOptionId: updatedSceneOption,
                sceneResponseIds: updatedResponses,
              });
            })
          );
          return {
            ...level,
            sceneIds: updatedScenes,
          };
        }
        return level;
      })
    );
    const response = GetLevelsByChapterIdResponse(updatedLevels);
    return sendResponse(res, 200, "Levels fetched successfully", response, 0);
  } catch (error) {
    return sendResponse(
      res,
      500,
      "Failed to get levels by chapter ID",
      null,
      1,
      error.message
    );
  }
};

export const UpdateLevel = async (req, res) => {
  try {
    const { levelId } = req.params;
    const {
      levelLocation,
      levelMessage,
      levelHint,
      increaseXp,
      isLastLevel,
      nextChapterId,
      levelImage,
      sceneIds,
    } = req.body;
    const validScenes = await Scene.find({ sceneId: { $in: sceneIds } });
    if (validScenes.length !== sceneIds.length) {
      return sendResponse(res, 404, "Scene ID(s) not found");
    }
    const updatedLevel = await Level.findOneAndUpdate(
      { levelId: levelId },
      {
        levelLocation,
        levelMessage,
        levelHint,
        increaseXp,
        isLastLevel,
        nextChapterId,
        levelImage,
        sceneIds,
      },
      { new: true, runValidators: true }
    );
    if (!updatedLevel) {
      return sendResponse(res, 404, `Level with ID ${levelId} not found`);
    }
    const response = CreateAndUpdateLevelResponse(updatedLevel);
    return sendResponse(res, 200, "Level updated successfully", response);
  } catch (error) {
    return sendResponse(
      res,
      400,
      "Failed to update level",
      null,
      1,
      error.message
    );
  }
};
