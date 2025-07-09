import Chapter from "../model/chapter.js";
import Level from "../model/level.js";
import Story from "../model/story.js";
import sendResponse from "../utility/utility.js";
import {
  CreateAndUpdateChapterResponse,
  GetChaptersResponse,
} from "../dto/chapter/index.js";

export const GetChapters = async (req, res) => {
  try {
    const { storyId } = req.params;
    const story = await Story.findOne({ storyId });
    if (!story) {
      return sendResponse(res, 404, "Chapter not found");
    }
    const chapters = await Chapter.find({
      chapterId: { $in: story.chapterIds },
    });
    if (chapters.length === 0) {
      return sendResponse(res, 404, "No chapters found for this story.");
    }
    const response = GetChaptersResponse(chapters);
    sendResponse(res, 200, "Fetched Chapters SuccessFully!", response, 0);
  } catch (error) {
    sendResponse(res, 400, "Failed to get chapters", null, 1, error.message);
  }
};

export const CreateChapter = async (req, res) => {
  try {
    const { storyId } = req.params;
    const {
      chapterTitle,
      chapterDescription,
      levelIds,
      isCompleted,
      isActive,
      chapterImage,
    } = req.body;
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
    const level = await Level.find({
      levelId: { $in: levelIds },
    });
    if (level.length === 0 || level.length !== levelIds.length) {
      return sendResponse(res, 404, "Level ID(s) not found");
    }
    const newChapter = await Chapter.create({
      chapterTitle,
      chapterDescription,
      isCompleted,
      isActive,
      levelIds: levelIds || [],
      chapterImage,
    });
    story.chapterIds.push(newChapter.chapterId);
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

export const UpdateChapter = async (req, res) => {
  try {
    const { chapterId } = req.params;
    const {
      chapterTitle,
      chapterDescription,
      levelIds,
      isCompleted,
      isActive,
      chapterImage,
    } = req.body;
    const chapter = await Chapter.findOne({ chapterId });
    if (!chapter) {
      return sendResponse(res, 404, `Chapter with ID: ${chapterId} Not found`);
    }
    const level = await Level.find({
      levelId: { $in: levelIds },
    });
    if (level.length === 0 || level.length !== levelIds.length) {
      return sendResponse(res, 404, "Level ID(s) not found");
    }
    const updatedChapter = await Chapter.findOneAndUpdate(
      { chapterId: chapterId },
      {
        chapterTitle,
        chapterDescription,
        levelIds,
        isCompleted,
        isActive,
        chapterImage,
      },
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
