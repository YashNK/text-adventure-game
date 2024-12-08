import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user.js";
import sendResponse from "../utility/utility.js";
import Character from "../model/character.js";

export const registerUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return sendResponse(res, 400, "All fields are required");
  }
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return sendResponse(res, 400, "Username already taken");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: username.toLowerCase(),
      password: hashedPassword,
    });
    await newUser.save();
    sendResponse(res, 201, "User registered successfully", {
      username: newUser.username,
    });
  } catch (error) {
    sendResponse(res, 400, "Server Error");
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return sendResponse(res, 400, "All fields are required");
  }
  try {
    const user = await User.findOne({ username });
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
    return sendResponse(res, 400, "Server Error");
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password -_id");
    if (!user) {
      return sendResponse(res, 401, "User Not Found");
    }
    return sendResponse(res, 200, "Current User Fetched Successfully", user, 0);
  } catch (err) {
    return sendResponse(res, 400, "Server Error");
  }
};

export const setUserCharacter = async (req, res) => {
  const { userId } = req.params;
  const { characterId } = req.body;
  try {
    const character = await Character.findOne({ characterId });
    if (!character) {
      return sendResponse(res, 404, "Character not found", null);
    }
    const user = await User.findOne({ userId });
    if (!user) {
      return sendResponse(res, 404, "User not found", null);
    }
    user.CharacterId = characterId;
    const updatedUser = await user.save();
    sendResponse(
      res,
      200,
      "User character updated successfully",
      updatedUser,
      1
    );
  } catch (error) {
    sendResponse(res, 500, "Server error", null);
  }
};
