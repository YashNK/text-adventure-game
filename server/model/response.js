import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

const autoIncrement = mongooseSequence(mongoose);

const responseSchema = new mongoose.Schema(
  {
    responseId: {
      type: Number,
    },
    responseOption: [
      {
        type: String,
        required: true,
      },
    ],
    nextSceneId: {
      required: true,
      type: Number,
    },
  },
  {
    versionKey: false,
  }
);

responseSchema.plugin(autoIncrement, { inc_field: "responseId" });
const Response = mongoose.model("Response", responseSchema);
export default Response;
