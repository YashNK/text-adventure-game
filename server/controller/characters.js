import { CreateCharacterResponse } from "../dto/character/index.js";
import Character from "../model/character.js";
import Story from "../model/story.js";
import sendResponse from "../utility/utility.js";

export const getCharactersByStoryId = async (req, res) => {
  try {
    const { storyId } = req.params;
    if (isNaN(storyId)) {
      return sendResponse(res, 400, "Invalid Story ID. It should be a number");
    }
    const story = await Story.findOne({ storyId });
    if (!story) {
      return sendResponse(res, 400, "Story not found");
    }
    const characters = await Character.find({
      characterId: { $in: story.characters },
    }).select("-_id");
    return sendResponse(
      res,
      200,
      "Characters retrieved successfully",
      characters,
      0
    );
  } catch (error) {
    return sendResponse(
      res,
      400,
      "Failed to get character by story",
      null,
      1,
      error.message
    );
  }
};

export const createCharacter = async (req, res) => {
  try {
    const characterData = req.body;
    const newCharacter = new Character(characterData);
    await newCharacter.save();
    const newCharacterResponse = CreateCharacterResponse(newCharacter);
    return sendResponse(
      res,
      200,
      "Character created successfully",
      newCharacterResponse
    );
  } catch (error) {
    return sendResponse(
      res,
      400,
      "Failed to create character",
      null,
      1,
      error.message
    );
  }
};
