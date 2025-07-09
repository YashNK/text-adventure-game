import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

const autoIncrement = mongooseSequence(mongoose);

const sceneOptionSchema = new mongoose.Schema(
  {
    sceneOptionId: {
      type: Number,
      unique: true,
    },
    look: {
      type: String,
      required: true,
    },
    north: {
      type: Number,
    },
    south: {
      type: Number,
    },
    east: {
      type: Number,
    },
    west: {
      type: Number,
    },
    attackMonsterId: {
      type: Number,
      ref: "Monster",
    },
    flee: {
      type: Number,
    },
    searchItemId: {
      type: Number,
      ref: "Item",
    },
  },
  {
    versionKey: false,
  }
);

sceneOptionSchema.plugin(autoIncrement, { inc_field: "sceneOptionId" });
const SceneOption = mongoose.model("SceneOption", sceneOptionSchema);
export default SceneOption;
