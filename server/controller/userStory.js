import Character from "../model/character.js";
import Story from "../model/story.js";
import User from "../model/user.js";
import UserStory from "../model/userStory.js";
import sendResponse from "../utility/utility.js";

export const setUserCharacter = async (req, res) => {
  const { userId } = req.params;
  const { characterId, storyId } = req.body;
  try {
    const character = await Character.findOne({ characterId });
    if (!character) {
      return sendResponse(res, 404, "Character not found", null);
    }
    const user = await User.findOne({ userId });
    if (!user) {
      return sendResponse(res, 404, "User not found", null);
    }
    const story = await Story.findOne({ storyId });
    if (!story) {
      return sendResponse(res, 404, "Story not found", null);
    }
    const existingEntry = await UserStory.findOne({ userId, storyId });
    if (existingEntry) {
      existingEntry.characterId = characterId;
      const updatedEntry = await existingEntry.save();
      return sendResponse(
        res,
        200,
        "User character updated for the story",
        updatedEntry,
        0
      );
    }
    const newEntry = new UserStory({
      userId,
      characterId,
      storyId,
    });
    const savedEntry = await newEntry.save();
    return sendResponse(
      res,
      201,
      "User character set for the story",
      savedEntry,
      0
    );
  } catch (error) {
    return sendResponse(
      res,
      400,
      "Failed to set user's character",
      null,
      1,
      error.message
    );
  }
};

export const getUserStoriesForUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const userStories = await UserStory.find({ userId }).select(
      "storyId characterId"
    );
    if (!userStories || userStories.length === 0) {
      return sendResponse(res, 404, "No stories found for this user", []);
    }
    const detailedStories = await Promise.all(
      userStories.map(async (userStory) => {
        const { storyId, characterId } = userStory;
        const character = characterId
          ? await Character.findOne({ characterId }).select("characterId")
          : null;
        const story = storyId
          ? await Story.findOne({ storyId }).select("storyId")
          : null;
        return {
          storyId: story ? story.storyId : null,
          characterId: character ? character.characterId : null,
        };
      })
    );
    return sendResponse(
      res,
      200,
      "User stories fetched successfully",
      detailedStories,
      0
    );
  } catch (error) {
    return sendResponse(
      res,
      400,
      "failed to get user-story details",
      null,
      1,
      error.message
    );
  }
};

export const getUserCharacterForStory = async (req, res) => {
  const { userId, storyId } = req.params;
  try {
    const userStory = await UserStory.findOne({ userId, storyId });
    if (!userStory) {
      return sendResponse(
        res,
        404,
        "No character found for this story and user",
        null
      );
    }
    const { characterId } = userStory;
    if (!characterId) {
      return sendResponse(
        res,
        404,
        "No character is associated with this story",
        null
      );
    }
    const character = await Character.findOne({ characterId });
    if (!character) {
      return sendResponse(res, 404, "Character not found", null);
    }
    return sendResponse(
      res,
      200,
      "Character details fetched successfully",
      character,
      0
    );
  } catch (error) {
    return sendResponse(
      res,
      400,
      "Failed to fetch character details",
      null,
      1,
      error.message
    );
  }
};
