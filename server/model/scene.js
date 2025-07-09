import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

const autoIncrement = mongooseSequence(mongoose);

const sceneSchema = new mongoose.Schema(
  {
    sceneId: {
      type: Number,
      unique: true,
    },
    sceneMessage: {
      type: String,
      required: true,
    },
    hasMonster: {
      type: Boolean,
    },
    monsterName: {
      type: String,
    },
    hasNextScene: {
      type: Boolean,
    },
    sceneResponseIds: {
      type: Number,
      ref: "Response",
    },

    sceneOptionId: {
      type: Number,
      ref: "SceneOption",
    },
  },
  {
    versionKey: false,
  }
);

sceneSchema.plugin(autoIncrement, { inc_field: "sceneId" });
const Scene = mongoose.model("Scene", sceneSchema);
export default Scene;
