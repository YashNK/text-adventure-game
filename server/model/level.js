import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

const autoIncrement = mongooseSequence(mongoose);

const levelSchema = new mongoose.Schema(
  {
    levelTitle: {
      type: String,
      required: true,
    },
    levelMessage: {
      type: String,
      required: true,
    },
    scene: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Scene",
      },
    ],
    levelId: {
      type: Number,
      unique: true,
    },
  },
  {
    versionKey: false,
  }
);

levelSchema.plugin(autoIncrement, { inc_field: "levelId" });
const Level = mongoose.model("Level", levelSchema);
export default Level;
