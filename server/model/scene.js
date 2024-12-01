import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

const autoIncrement = mongooseSequence(mongoose);

const sceneSchema = new mongoose.Schema(
  {
    sceneMessage: {
      type: String,
      required: true,
    },
    sceneOptions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SceneOption",
      },
    ],
    sceneId: {
      type: Number,
      unique: true,
    },
  },
  {
    versionKey: false,
  }
);

sceneSchema.plugin(autoIncrement, { inc_field: "sceneId" });
const Scene = mongoose.model("Scene", sceneSchema);
export default Scene;
