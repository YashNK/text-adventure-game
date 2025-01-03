import Chapter from "../model/chapter.js";
import Level from "../model/level.js";
import Story from "../model/story.js";
import sendResponse from "../utility/utility.js";
import { CreateAndUpdateChapterResponse } from "../dto/chapter/index.js";

export const getChapters = async (req, res) => {
  try {
    const { storyId } = req.params;
    const story = await Story.findOne({ storyId }).select("chapters");
    if (!story) {
      return sendResponse(res, 404, "Chapter not found");
    }
    const chapters = await Chapter.find({
      chapterId: { $in: story.chapters },
    }).select(
      "chapterId chapterTitle chapterDescription isCompleted isActive levels"
    );
    if (chapters.length < 0) {
      return sendResponse(res, 404, "No chapters found for this story.");
    }
    sendResponse(res, 200, null, chapters, 0);
  } catch (error) {
    sendResponse(res, 400, "Failed to get chapters", null, 1, error.message);
  }
};

export const createChapter = async (req, res) => {
  try {
    const { storyId } = req.params;
    const { chapterTitle, chapterDescription, levels, isCompleted, isActive } =
      req.body;
    if (!chapterTitle || !chapterDescription) {
      return sendResponse(
        res,
        400,
        "Chapter title and description are required"
      );
    }
    const story = await Story.findOne({ storyId });
    if (!story) {
      return sendResponse(res, 404, "Story not found");
    }
    if (levels && levels.length > 0) {
      const invalidLevels = [];
      for (const levelId of levels) {
        const isValidLevel = await Level.exists({ levelId });
        if (!isValidLevel) {
          invalidLevels.push(levelId);
        }
      }
      if (invalidLevels.length > 0) {
        return sendResponse(
          res,
          400,
          `Invalid levelId(s): ${invalidLevels.join(", ")}`
        );
      }
    }
    const maxChapter = await Chapter.findOne()
      .sort({ chapterId: -1 })
      .select("chapterId");
    const newChapterId = maxChapter ? maxChapter.chapterId + 1 : 1;
    const newChapter = await Chapter.create({
      chapterId: newChapterId,
      chapterTitle,
      chapterDescription,
      isCompleted,
      isActive,
      levels: levels || [],
    });
    story.chapters.push(newChapter.chapterId);
    await story.save();
    const response = CreateAndUpdateChapterResponse(newChapter);
    return sendResponse(res, 201, "Chapter created successfully", response);
  } catch (error) {
    return sendResponse(
      res,
      400,
      "Failed to create chapter",
      null,
      1,
      error.message
    );
  }
};

export const updateChapter = async (req, res) => {
  try {
    const { chapterId } = req.params;
    const updateData = req.body;
    const updatedChapter = await Chapter.findOneAndUpdate(
      { chapterId: chapterId },
      updateData,
      { new: true, runValidators: true }
    );
    if (!updatedChapter) {
      return sendResponse(res, 404, `Chapter with ID ${chapterId} not found`);
    }
    const response = CreateAndUpdateChapterResponse(updatedChapter);
    return sendResponse(res, 200, "Chapter updated successfully", response);
  } catch (error) {
    return sendResponse(
      res,
      400,
      "Failed to update chapter",
      null,
      1,
      error.message
    );
  }
};
