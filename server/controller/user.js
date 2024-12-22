import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user.js";
import sendResponse from "../utility/utility.js";
import UserStory from "../model/userStory.js";
import Story from "../model/story.js";
import { CurrentUserResponse, LoginResponse } from "../dto/user/index.js";

export const registerUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return sendResponse(res, 400, "All fields are required");
  }
  try {
    const normalizedUsername = username.toLowerCase();
    const existingUser = await User.findOne({ username: normalizedUsername });
    if (existingUser) {
      return sendResponse(res, 400, "Username already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: normalizedUsername,
      password: hashedPassword,
    });
    await newUser.save();
    const stories = await Story.find();
    for (const story of stories) {
      const newUserStory = new UserStory({
        userId: newUser.userId,
        storyId: story.storyId,
        characterId: 0,
      });
      await newUserStory.save();
    }
    return sendResponse(res, 201, "User registered successfully");
  } catch (error) {
    return sendResponse(
      res,
      400,
      "User registration failed",
      null,
      1,
      error.message
    );
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return sendResponse(res, 400, "All fields are required");
  }
  try {
    const normalizedUsername = username.toLowerCase();
    const user = await User.findOne({ username: normalizedUsername });
    if (!user) {
      return sendResponse(res, 404, "User Not Found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return sendResponse(res, 400, "Invalid Password");
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    const response = LoginResponse(token, user);
    return sendResponse(res, 200, "Login Successful", response);
  } catch (error) {
    return sendResponse(res, 400, "User login failed", null, 1, error.message);
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return sendResponse(res, 401, "User Not Found");
    }
    const response = CurrentUserResponse(user);
    return sendResponse(
      res,
      200,
      "Current User Fetched Successfully",
      response,
      0
    );
  } catch (error) {
    return sendResponse(
      res,
      400,
      "Failed to get current user",
      null,
      1,
      error.message
    );
  }
};
