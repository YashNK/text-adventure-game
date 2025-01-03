import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

const autoIncrement = mongooseSequence(mongoose);

const levelSchema = new mongoose.Schema(
  {
    levelId: {
      type: Number,
      unique: true,
    },
    levelTitle: {
      type: String,
      required: true,
    },
    levelMessage: {
      type: String,
      required: true,
    },
    isLastLevel: {
      type: Boolean,
      default: false,
    },
    scene: [
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
