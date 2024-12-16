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
    },
    storyId: {
      type: Number,
      ref: "Story",
    },
    itemId: [
      {
        type: Number,
        ref: "Item",
      },
    ],
  },
  {
    versionKey: false,
  }
);

userStorySchema.plugin(autoIncrement, {
  inc_field: "userStoryId",
});
const UserStory = mongoose.model("userStory", userStorySchema);
export default UserStory;
