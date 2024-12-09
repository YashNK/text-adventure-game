import sendResponse from "../utility/utility.js";
import Story from "../model/story.js";
import Character from "../model/character.js";
import Chapter from "../model/chapter.js";

export const getAllStories = async (req, res) => {
  try {
    const stories = await Story.find().select("-_id -chapters -characters");
    sendResponse(res, 200, "All Stories Fetched Successfully", stories, 0);
  } catch (error) {
    sendResponse(res, 400, "Server Error");
  }
};

export const getStoryById = async (req, res) => {
  try {
    const { id: storyId } = req.params;
    if (isNaN(storyId)) {
      return sendResponse(res, 400, "Invalid Story ID. It should be a number.");
    }
    const story = await Story.findOne({ storyId })
      .populate({
        path: "chapters",
        select: "chapterId",
      })
      .populate({
        path: "characters",
        select: "characterId",
      });
    if (!story) {
      return sendResponse(res, 404, "Story not found");
    }
    const transformedStory = {
      storyId: story.storyId,
      storyTitle: story.storyTitle,
      storyDescription: story.storyDescription,
      chapterIds: story.chapters.map((chapter) => chapter.chapterId),
      characterIds: story.characters.map((character) => character.characterId),
    };
    sendResponse(res, 200, "Story fetched successfully", transformedStory);
  } catch (error) {
    sendResponse(res, 500, "Server error", null, 0);
  }
};

export const createStory = async (req, res) => {
  try {
    const storyData = req.body;
    if (!storyData.storyTitle) {
      return sendResponse(res, 400, "Story title is missing");
    }
    if (!storyData.storyDescription) {
      return sendResponse(res, 400, "Story Description is missing");
    }
    const storyTitleExists = await Story.findOne({
      storyTitle: storyData.storyTitle,
    });
    if (storyTitleExists) {
      return sendResponse(res, 400, "Story title already exists");
    }
    const newStory = new Story(storyData);
    await newStory.save();
    sendResponse(res, 200, "Story created successfully", newStory);
  } catch (error) {
    sendResponse(res, 400, "Server Error");
  }
};

export const updateStoryById = async (req, res) => {
  const { id: storyId } = req.params;
  const { storyTitle, storyDescription, characters, chapters } = req.body;
  try {
    if (isNaN(storyId)) {
      return sendResponse(
        res,
        400,
        "Invalid Story ID. It must be a valid number."
      );
    }
    const story = await Story.findOne({ storyId: storyId });
    if (!story) {
      return sendResponse(res, 404, "Story not found");
    }
    if (storyTitle) story.storyTitle = storyTitle;
    if (storyDescription) story.storyDescription = storyDescription;
    if (characters) {
      if (!Array.isArray(characters)) {
        return sendResponse(
          res,
          400,
          "`characters` must be an array of characterId values."
        );
      }
      const characterIds = await Character.find({
        characterId: { $in: characters },
      }).select("_id");
      if (characterIds.length !== characters.length) {
        return sendResponse(
          res,
          400,
          "Some `characterId` values do not exist in the database."
        );
      }
      story.characters = characterIds.map((c) => c._id);
    }
    if (chapters) {
      if (!Array.isArray(chapters)) {
        return sendResponse(
          res,
          400,
          "`chapters` must be an array of chapterId values."
        );
      }
      const chapterIds = await Chapter.find({
        chapterId: { $in: chapters },
      }).select("_id");
      if (chapterIds.length !== chapters.length) {
        return sendResponse(
          res,
          400,
          "Some `chapterId` values do not exist in the database."
        );
      }
      story.chapters = chapterIds.map((c) => c._id);
    }
    const updatedStory = await story.save();
    const resolvedCharacters = await Character.find({
      _id: { $in: updatedStory.characters },
    }).select("characterId");
    const resolvedChapters = await Chapter.find({
      _id: { $in: updatedStory.chapters },
    }).select("chapterId");
    sendResponse(res, 200, "Story updated successfully", {
      storyId: updatedStory.storyId,
      storyTitle: updatedStory.storyTitle,
      storyDescription: updatedStory.storyDescription,
      characters: resolvedCharacters.map((c) => c.characterId),
      chapters: resolvedChapters.map((c) => c.chapterId),
    });
  } catch (error) {
    sendResponse(res, 500, "Failed to update story", null, 0);
  }
};
