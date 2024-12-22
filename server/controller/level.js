import Chapter from "../model/chapter.js";
import Level from "../model/level.js";
import Scene from "../model/scene.js";
import SceneOption from "../model/sceneOption.js";
import sendResponse from "../utility/utility.js";
import {
  CreateAndUpdateLevelResponse,
  GetLevelsByChapterIdResponse,
} from "../dto/level/index.js";

export const createLevel = async (req, res) => {
  try {
    const { chapterId } = req.params;
    const chapter = await Chapter.findOne({ chapterId });
    if (!chapter) {
      return sendResponse(res, 404, "Chapter not found");
    }
    const { levelTitle, levelMessage, scene, isLastLevel } = req.body;
    const validScenes = await Scene.find({ sceneId: { $in: scene } });
    if (validScenes.length !== scene.length) {
      return sendResponse(res, 400, "One or more scenes do not exist");
    }
    const newLevel = new Level({
      levelTitle,
      levelMessage,
      scene,
      isLastLevel,
    });
    await newLevel.save();
    chapter.levels.push(newLevel.levelId);
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

export const getLevelsByChapterId = async (req, res) => {
  try {
    const { chapterId } = req.params;
    const chapter = await Chapter.findOne({ chapterId });
    if (!chapter) {
      return sendResponse(res, 404, "Chapter not found");
    }
    const levels = await Level.find({
      levelId: { $in: chapter.levels },
    })
      .select("-_id")
      .lean();
    for (const level of levels) {
      if (level.scene) {
        const scene = await Scene.findOne({ sceneId: level.scene })
          .select("-_id")
          .lean();
        if (scene) {
          const sceneOptions = await SceneOption.findOne({
            sceneOptionId: scene.sceneOptions,
          })
            .select("-_id")
            .lean();
          scene.sceneOptions = sceneOptions;
        }
        level.scene = scene;
      }
    }
    const response = GetLevelsByChapterIdResponse(levels);
    return sendResponse(res, 200, "Levels fetched successfully", response, 0);
  } catch (error) {
    return sendResponse(
      res,
      400,
      "Failed to get level by Level",
      null,
      1,
      error.message
    );
  }
};

export const updateLevel = async (req, res) => {
  try {
    const { levelId } = req.params;
    const updateData = req.body;
    const updatedLevel = await Level.findOneAndUpdate(
      { levelId: levelId },
      updateData,
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
      "Failed to update Level",
      null,
      1,
      error.message
    );
  }
};
