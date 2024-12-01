import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

const autoIncrement = mongooseSequence(mongoose);

const storySchema = new mongoose.Schema(
  {
    storyTitle: {
      type: String,
      required: true,
    },
    storyDescription: {
      type: String,
      required: true,
    },
    chapters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chapter",
      },
    ],
    storyId: {
      type: Number,
      unique: true,
    },
  },
  {
    versionKey: false,
  }
);

storySchema.plugin(autoIncrement, { inc_field: "storyId" });
const Story = mongoose.model("Story", storySchema);
export default Story;
