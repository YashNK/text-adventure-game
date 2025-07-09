import sendResponse from "../utility/utility.js";
import Story from "../model/story.js";
import Character from "../model/character.js";
import Chapter from "../model/chapter.js";
import UserStory from "../model/userStory.js";
import {
  CreateAndUpdateStoryResponse,
  GetAllStoriesResponse,
  GetOneStoryResponse,
} from "../dto/story/index.js";
import User from "../model/user.js";

export const GetAllStories = async (req, res) => {
  try {
    const { userId } = req.params;
    if (isNaN(userId)) {
      return sendResponse(res, 400, "Invalid User ID. It should be a number");
    }

    const user = await User.findOne({ userId });
    if (!user) {
      return sendResponse(res, 400, "User not found");
    }
    const stories = await Story.find();
    if (!stories) {
      return sendResponse(res, 404, "Stories Not Found", null, 0);
    }
    const userStories = await UserStory.find({ userId });
    const response = GetAllStoriesResponse(stories, userStories);
    return sendResponse(
      res,
      200,
      "All Stories Fetched Successfully",
      response,
      0
    );
  } catch (error) {
    return sendResponse(res, 400, "Server Error", null, 1, error.message);
  }
};

export const GetStoryById = async (req, res) => {
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

export const CreateStory = async (req, res) => {
  try {
    const {
      storyTitle,
      storyDescription,
      storyImage,
      characterIds,
      chapterIds,
    } = req.body;
    if (!storyTitle) {
      return sendResponse(res, 400, "Story title is missing");
    }
    const storyTitleExists = await Story.findOne({ storyTitle });
    if (storyTitleExists) {
      return sendResponse(res, 400, "Story title already exists");
    }
    if (!storyDescription) {
      return sendResponse(res, 400, "Story Description is missing");
    }
    const chapter = await Chapter.find({
      chapterId: { $in: chapterIds },
    });
    if (chapter.length !== chapterIds.length) {
      return sendResponse(res, 404, "Chapter ID(s) Not Found");
    }
    const character = await Character.find({
      characterId: { $in: characterIds },
    });
    if (character.length !== characterIds.length) {
      return sendResponse(res, 404, "Character ID(s) Not Found");
    }
    const newStory = new Story({
      storyTitle,
      storyDescription,
      storyImage,
      characterIds,
      chapterIds,
    });
    await newStory.save();
    const response = CreateAndUpdateStoryResponse(newStory);
    return sendResponse(res, 201, "Story created successfully", response);
  } catch (error) {
    return sendResponse(
      res,
      400,
      "Failed to create story",
      null,
      1,
      error.message
    );
  }
};

export const UpdateStoryById = async (req, res) => {
  const { id: storyId } = req.params;
  const { storyTitle, storyDescription, storyImage, characterIds, chapterIds } =
    req.body;
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
    if (storyTitle) {
      story.storyTitle = storyTitle;
    }
    if (storyDescription) {
      story.storyDescription = storyDescription;
    }
    if (storyImage) {
      story.storyImage = storyImage;
    }
    if (chapterIds) {
      const chapter = await Chapter.find({
        chapterId: { $in: chapterIds },
      });
      if (chapter.length !== chapterIds.length) {
        return sendResponse(res, 404, "Chapter ID(s) Not Found");
      }
      story.chapterIds = chapterIds;
    }
    if (characterIds) {
      const character = await Character.find({
        characterId: { $in: characterIds },
      });
      if (character.length !== characterIds.length) {
        return sendResponse(res, 404, "Character ID(s) Not Found");
      }
      story.characterIds = characterIds;
    }
    const updatedStory = await story.save();
    const response = CreateAndUpdateStoryResponse(updatedStory);
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
