import { CreateAndUpdateResponse } from "../dto/response/index.js";
import Response from "../model/response.js";
import Scene from "../model/scene.js";
import sendResponse from "../utility/utility.js";

export const CreateResponse = async (req, res) => {
  try {
    const { responseOption, nextSceneId } = req.body;
    if (!responseOption) {
      return sendResponse(res, 404, "Responses is required");
    }
    if (!nextSceneId) {
      return sendResponse(res, 404, "Next Scene Id is required");
    }
    const scene = await Scene.findOne({ nextSceneId });
    if (!scene) {
      return sendResponse(res, 404, `Scene with ID: ${nextSceneId} not found`);
    }
    const newResponse = await Response.create({
      responseOption,
      nextSceneId,
    });
    const response = CreateAndUpdateResponse(newResponse);
    return sendResponse(res, 200, "Response Created Successfully", response);
  } catch (error) {
    return sendResponse(
      res,
      400,
      "Failed to create Response",
      null,
      1,
      error.message
    );
  }
};

export const UpdateResponse = async (req, res) => {
  try {
    const { responseId } = req.params;
    const { responseOption, nextSceneId } = req.body;
    if (!responseOption) {
      return sendResponse(res, 404, "Responses is required");
    }
    if (!nextSceneId) {
      return sendResponse(res, 404, "Next Scene Id is required");
    }
    const scene = await Scene.findOne({ nextSceneId });
    if (!scene) {
      return sendResponse(res, 404, `Scene with ID: ${nextSceneId} not found`);
    }
    const responseModel = await Response.findOne({ responseId });
    if (!responseModel) {
      return sendResponse(res, 404, `Response with ID: ${responseId} not fond`);
    }
    responseModel.responseOption = responseOption;
    responseModel.nextSceneId = nextSceneId;
    await responseModel.save();
    const response = CreateAndUpdateResponse(responseModel);
    return sendResponse(res, 200, "Response updated Successfully", response);
  } catch (error) {
    return sendResponse(
      res,
      400,
      "Failed to update Response",
      null,
      1,
      error.message
    );
  }
};
