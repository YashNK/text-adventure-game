import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

const autoIncrement = mongooseSequence(mongoose);

const chapterSchema = new mongoose.Schema(
  {
    chapterId: {
      type: Number,
      unique: true,
    },
    chapterTitle: {
      type: String,
      required: true,
    },
    chapterDescription: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    levels: [
      {
        type: Number,
        ref: "Level",
      },
    ],
  },
  {
    versionKey: false,
  }
);

chapterSchema.plugin(autoIncrement, { inc_field: "chapterId" });
const Chapter = mongoose.model("Chapter", chapterSchema);
export default Chapter;
