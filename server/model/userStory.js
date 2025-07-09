import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

const autoIncrement = mongooseSequence(mongoose);

const userStorySchema = new mongoose.Schema(
  {
    userStoryId: {
      type: Number,
      unique: true,
    },
    userId: {
      type: Number,
      ref: "User",
      required: true,
    },
    characterId: {
      type: Number,
      ref: "Character",
      required: false,
    },
    storyId: {
      type: Number,
      ref: "Story",
      required: false,
    },
    itemIds: [
      {
        type: Number,
        ref: "Item",
      },
    ],
    currentCharacterXp: {
      type: Number,
    },
    currentCharacterHealth: {
      type: Number,
    },
    currentCharacterAttackPower: {
      type: Number,
    },
    currentCharacterDefense: {
      type: Number,
    },
    currentCharacterMoney: {
      type: Number,
    },
  },
  {
    versionKey: false,
  }
);

userStorySchema.plugin(autoIncrement, {
  inc_field: "userStoryId",
});
const UserStory = mongoose.model("UserStory", userStorySchema);
export default UserStory;
