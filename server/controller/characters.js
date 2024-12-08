import Character from "../model/character.js";
import Story from "../model/story.js";
import sendResponse from "../utility/utility.js";

export const getCharactersByStoryId = async (req, res) => {
  try {
    const { storyId } = req.params;
    const story = await Story.findOne({ storyId }).populate("characters");
    if (!story) {
      return sendResponse(res, 404, "Story not found");
    }
    sendResponse(res, 200, null, story.characters);
  } catch (error) {
    sendResponse(res, 400, "Server Error");
  }
};

export const createCharacter = async (req, res) => {
  try {
    const { storyId } = req.params;
    const characterData = req.body;
    const story = await Story.findOne({ storyId });
    if (!story) {
      sendResponse(res, 400, "Story not found");
    }
    const newCharacter = new Character(characterData);
    await newCharacter.save();
    story.characters.push(newCharacter._id);
    await story.save();
    sendResponse(res, 200, "Character created successfully", newCharacter);
  } catch (error) {
    sendResponse(res, 400, "Server Error");
  }
};
