import Character from "../model/character.js";
import Story from "../model/story.js";
import User from "../model/user.js";
import UserStory from "../model/userStory.js";
import sendResponse from "../utility/utility.js";
import {
  GetUserCharacterResponse,
  SetUserCharacterResponse,
} from "../dto/userStory/index.js";

export const setUserCharacter = async (req, res) => {
  const { userId } = req.params;
  const { characterId, storyId } = req.body;
  try {
    const user = await User.findOne({ userId });
    if (!user) {
      return sendResponse(res, 404, "User not found", null);
    }
    const story = await Story.findOne({ storyId });
    if (!story) {
      return sendResponse(res, 404, "Story not found", null);
    }
    const character = await Character.findOne({ characterId });
    if (!character) {
      return sendResponse(res, 404, "Character not found", null);
    }
    const existingEntry = await UserStory.findOne({ userId, storyId });
    if (existingEntry) {
      existingEntry.characterId = characterId;
      const updatedEntry = await existingEntry.save();
      const response = SetUserCharacterResponse(updatedEntry);
      return sendResponse(
        res,
        200,
        "User character updated for the story",
        response,
        0
      );
    }
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

export const getUserCharacter = async (req, res) => {
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
    const response = GetUserCharacterResponse(character);
    return sendResponse(
      res,
      200,
      "Character details fetched successfully",
      response,
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
