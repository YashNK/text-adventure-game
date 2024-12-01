import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

const autoIncrement = mongooseSequence(mongoose);

const sceneOptionSchema = new mongoose.Schema(
  {
    look: {
      type: String,
      required: true,
    },
    west: {
      type: Number,
    },
    north: {
      type: Number,
    },
    east: {
      type: Number,
    },
    attack: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Monster",
      },
    ],
    startNewChapter: {
      type: Number,
    },
    sceneOptionId: {
      type: Number,
      unique: true,
    },
  },
  {
    versionKey: false,
  }
);

sceneOptionSchema.plugin(autoIncrement, { inc_field: "sceneOptionId" });
const SceneOption = mongoose.model("SceneOption", sceneOptionSchema);
export default SceneOption;
