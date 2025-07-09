import Character from "../model/character.js";
import Story from "../model/story.js";
import User from "../model/user.js";
import UserStory from "../model/userStory.js";
import sendResponse from "../utility/utility.js";
import {
  UserCharacterResponse,
  UserStoryResponse,
} from "../dto/userStory/index.js";

export const SetUserCharacter = async (req, res) => {
  const { userId } = req.params;
  const {
    characterId,
    storyId,
    itemIds,
    currentCharacterXp,
    currentCharacterHealth,
    currentCharacterAttackPower,
    currentCharacterDefense,
    currentCharacterMoney,
  } = req.body;
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
    if (!existingEntry) {
      return sendResponse(res, 404, "User Story Details not found", null);
    }
    if (existingEntry) {
      existingEntry.characterId = character.characterId;
      existingEntry.currentCharacterXp =
        currentCharacterXp || character.characterXp;
      existingEntry.currentCharacterHealth =
        currentCharacterHealth || character.characterHealth;
      existingEntry.currentCharacterAttackPower =
        currentCharacterAttackPower || character.attackPower;
      existingEntry.currentCharacterDefense =
        currentCharacterDefense || character.characterDefense;
      existingEntry.currentCharacterMoney =
        currentCharacterMoney || character.characterMoney;
      existingEntry.itemIds = itemIds || [];
      const updatedEntry = await existingEntry.save();
      const response = UserStoryResponse(updatedEntry);
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

export const GetUserCharacter = async (req, res) => {
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
    const response = UserCharacterResponse(character, userStory);
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

export const CreateUserStory = async (req, res) => {
  const { userId } = req.params;
  const { storyId } = req.body;
  const user = await User.findOne({ userId });
  if (!user) {
    return sendResponse(res, 404, "User not found", null);
  }
  const story = await Story.findOne({ storyId });
  if (!story) {
    return sendResponse(res, 404, "Story not found", null);
  }
  const newUserStory = new UserStory({
    userId: userId,
    characterId: null,
    storyId: storyId,
    itemIds: [],
    currentCharacterXp: null,
    currentCharacterHealth: null,
    currentCharacterAttackPower: null,
    currentCharacterDefense: null,
    currentCharacterMoney: null,
  });
  await newUserStory.save();
  const response = UserStoryResponse(newUserStory);
  return sendResponse(
    res,
    200,
    "User character updated for the story",
    response,
    0
  );
};
