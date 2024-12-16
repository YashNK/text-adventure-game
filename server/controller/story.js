import sendResponse from "../utility/utility.js";
import Story from "../model/story.js";
import Character from "../model/character.js";
import Chapter from "../model/chapter.js";
import {
  CreateStoryResponse,
  GetOneStoryResponse,
  UpdateStoryResponse,
} from "../dto/story/index.js";

export const getAllStories = async (req, res) => {
  try {
    const stories = await Story.find().select("-_id");
    return sendResponse(
      res,
      200,
      "All Stories Fetched Successfully",
      stories,
      0
    );
  } catch (error) {
    return sendResponse(res, 400, "Server Error", null, 1, error.message);
  }
};

export const getStoryById = async (req, res) => {
  try {
    const { id: storyId } = req.params;
    if (isNaN(storyId)) {
      return sendResponse(res, 400, "Invalid Story ID. It should be a number");
    }
    const story = await Story.findOne({ storyId });
    if (!story) {
      return sendResponse(res, 400, "Story Not Found");
    }
    const chapters = await Chapter.find({
      chapterId: { $in: story.chapters },
    }).select("chapterId title");
    const characters = await Character.find({
      characterId: { $in: story.characters },
    }).select("characterId name");
    const response = GetOneStoryResponse(story, chapters, characters);
    return sendResponse(res, 200, "Story Fetched Successfully", response, 0);
  } catch (error) {
    return sendResponse(res, 400, "Server Error", null, 1, error.message);
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
    const storyResponse = CreateStoryResponse(newStory);
    return sendResponse(res, 200, "Story created successfully", storyResponse);
  } catch (error) {
    return sendResponse(res, 400, "Server Error", null, 1, error.message);
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
    const story = await Story.findOne({ storyId });
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
      const validCharacters = await Character.find({
        characterId: { $in: characters },
      }).select("characterId");
      const validCharacterIds = validCharacters.map((c) => c.characterId);
      if (validCharacterIds.length !== characters.length) {
        return sendResponse(
          res,
          400,
          "Some `characterId` values do not exist in the database."
        );
      }
      story.characters = validCharacterIds;
    }
    if (chapters) {
      if (!Array.isArray(chapters)) {
        return sendResponse(
          res,
          400,
          "`chapters` must be an array of chapterId values."
        );
      }
      const validChapters = await Chapter.find({
        chapterId: { $in: chapters },
      }).select("chapterId");
      const validChapterIds = validChapters.map((c) => c.chapterId);
      if (validChapterIds.length !== chapters.length) {
        return sendResponse(
          res,
          400,
          "Some `chapterId` values do not exist in the database."
        );
      }
      story.chapters = validChapterIds;
    }
    const updatedStory = await story.save();
    const response = UpdateStoryResponse(updatedStory);
    return sendResponse(res, 200, "Story updated successfully", response);
  } catch (error) {
    return sendResponse(
      res,
      400,
      "Failed to update story",
      null,
      1,
      error.message
    );
  }
};
