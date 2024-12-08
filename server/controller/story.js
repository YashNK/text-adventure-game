import Story from "../model/story.js";
import sendResponse from "../utility/utility.js";

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
    const story = await Story.findById(req.params.id)
      .populate("chapters")
      .select("-_id -characters");
    if (!story) {
      return sendResponse(res, 404, "Story not found");
    }
    sendResponse(res, 200, "Story Fetched Successfully", story, 0);
  } catch (error) {
    sendResponse(res, 400, "Server Error");
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
