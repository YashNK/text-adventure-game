import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

const autoIncrement = mongooseSequence(mongoose);

const chapterSchema = new mongoose.Schema(
  {
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Level",
      },
    ],
    chapterId: {
      type: Number,
      unique: true,
    },
  },
  {
    versionKey: false,
  }
);

chapterSchema.plugin(autoIncrement, { inc_field: "chapterId" });
const Chapter = mongoose.model("Chapter", chapterSchema);
export default Chapter;