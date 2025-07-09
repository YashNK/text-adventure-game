import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

const autoIncrement = mongooseSequence(mongoose);

const storySchema = new mongoose.Schema(
  {
    storyId: {
      type: Number,
      unique: true,
    },
    storyTitle: {
      type: String,
      required: true,
    },
    storyDescription: {
      type: String,
      required: true,
    },
    storyImage: {
      type: String,
      required: true,
    },
    characterIds: [
      {
        type: Number,
        ref: "Character",
      },
    ],
    chapterIds: [
      {
        type: Number,
        ref: "Chapter",
      },
    ],
  },
  {
    versionKey: false,
  }
);

storySchema.plugin(autoIncrement, { inc_field: "storyId" });
const Story = mongoose.model("Story", storySchema);
export default Story;
