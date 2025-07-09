import Character from "../model/character.js";
import Story from "../model/story.js";
import sendResponse from "../utility/utility.js";
import { CreateAndUpdateCharacterResponse } from "../dto/character/index.js";

export const GetCharactersByStoryId = async (req, res) => {
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
      characterId: { $in: story.characterIds },
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

export const CreateCharacter = async (req, res) => {
  try {
    const {
      characterName,
      characterDescription,
      characterXp,
      characterHealth,
      attackPower,
      specialAbility,
      characterDefense,
      characterMoney,
      characterClass,
      characterAvatar,
    } = req.body;
    if (!characterName) {
      return sendResponse(res, 400, "Character's Name is missing");
    }
    if (!characterDescription) {
      return sendResponse(res, 400, "Character's Description is missing");
    }
    if (!characterXp) {
      return sendResponse(res, 400, "Character's XP is missing");
    }
    if (!characterHealth) {
      return sendResponse(res, 400, "Character's Health is missing");
    }
    if (!attackPower) {
      return sendResponse(res, 400, "Character's Attack Power is missing");
    }
    if (!specialAbility) {
      return sendResponse(res, 400, "Character's Special Ability is missing");
    }
    if (!characterDefense) {
      return sendResponse(res, 400, "Character's Defense is missing");
    }
    if (!characterMoney) {
      return sendResponse(res, 400, "Character's Money is missing");
    }
    if (!characterClass) {
      return sendResponse(res, 400, "Character's Class is missing");
    }
    if (!characterAvatar) {
      return sendResponse(res, 400, "Character's Avatar is missing");
    }
    const newCharacter = new Character({
      characterName,
      characterDescription,
      characterXp,
      characterHealth,
      attackPower,
      specialAbility,
      characterDefense,
      characterMoney,
      characterClass,
      characterAvatar,
    });
    await newCharacter.save();
    const newCharacterResponse = CreateAndUpdateCharacterResponse(newCharacter);
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

export const UpdateCharacter = async (req, res) => {
  try {
    const { characterId } = req.params;
    const {
      characterName,
      characterDescription,
      characterXp,
      characterHealth,
      attackPower,
      specialAbility,
      characterDefense,
      characterMoney,
      characterClass,
      characterAvatar,
    } = req.body;
    const updatedCharacter = await Character.findOneAndUpdate(
      { characterId: characterId },
      {
        characterName,
        characterDescription,
        characterXp,
        characterHealth,
        attackPower,
        specialAbility,
        characterDefense,
        characterMoney,
        characterClass,
        characterAvatar,
      },
      { new: true, runValidators: true }
    );
    if (!updatedCharacter) {
      return sendResponse(res, 404, `Character with ID ${chapterId} not found`);
    }
    const response = CreateAndUpdateCharacterResponse(updatedCharacter);
    return sendResponse(res, 200, "Character updated successfully", response);
  } catch (error) {
    return sendResponse(
      res,
      400,
      "Failed to update Character",
      null,
      1,
      error.message
    );
  }
};
