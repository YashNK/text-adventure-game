import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

const autoIncrement = mongooseSequence(mongoose);

const levelSchema = new mongoose.Schema(
  {
    levelId: {
      type: Number,
      unique: true,
    },
    levelLocation: {
      type: String,
      required: true,
    },
    levelMessage: {
      type: String,
      required: true,
    },
    levelHint: {
      type: String,
    },
    increaseXp: {
      type: Number,
    },
    isLastLevel: {
      type: Boolean,
      default: false,
    },
    nextChapterId: {
      type: Number,
      required: false,
    },
    levelImage: {
      type: String,
      required: false,
    },
    sceneIds: [
      {
        type: Number,
        ref: "Scene",
      },
    ],
  },
  {
    versionKey: false,
  }
);

levelSchema.plugin(autoIncrement, { inc_field: "levelId" });
const Level = mongoose.model("Level", levelSchema);
export default Level;
