import { CreateLevelResponse } from "../dto/level/index.js";
import Chapter from "../model/chapter.js";
import Level from "../model/level.js";
import Scene from "../model/scene.js";
import SceneOption from "../model/sceneOption.js";
import sendResponse from "../utility/utility.js";

export const createLevel = async (req, res) => {
  try {
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
    const response = CreateLevelResponse(newLevel);
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
    const chapter = await Chapter.findOne({ chapterId }).lean();
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
          const sceneOptions = await SceneOption.find({
            sceneOptionId: { $in: scene.sceneOptions },
          })
            .select("-_id")
            .lean();
          scene.sceneOptions = sceneOptions;
        }
        level.scene = scene;
      }
    }
    return sendResponse(res, 200, "Levels fetched successfully", levels, 0);
  } catch (error) {
    return sendResponse(
      res,
      400,
      "Failed to get level by chapter",
      null,
      1,
      error.message
    );
  }
};
