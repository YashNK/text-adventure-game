import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user.js";
import sendResponse from "../utility/utility.js";
import UserStory from "../model/userStory.js";

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
    const newUserChapter = new UserStory({
      userId: newUser.userId,
      chapterId: null,
      characterId: null,
    });
    await newUserChapter.save();
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
    return sendResponse(res, 200, "Login Successful", { token: token });
  } catch (error) {
    return sendResponse(res, 400, "User login failed", null, 1, error.message);
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password -_id");
    if (!user) {
      return sendResponse(res, 401, "User Not Found");
    }
    return sendResponse(res, 200, "Current User Fetched Successfully", user, 0);
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
