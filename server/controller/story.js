import Story from "../model/story.js";
import sendResponse from "../utility/utility.js";

export const getAllStories = async (req, res) => {
  try {
    const stories = await Story.find().populate("chapters");
    sendResponse(res, 201, null, stories);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Server Error" });
  }
};

export const getStoryById = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id).populate("chapters");
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }
    res.status(200).json(story);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Server Error" });
  }
};
