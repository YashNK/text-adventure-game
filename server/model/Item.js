import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

const autoIncrement = mongooseSequence(mongoose);

const itemSchema = new mongoose.Schema(
  {
    itemId: {
      type: Number,
      unique: true,
    },
    itemName: {
      type: string,
      required: true,
      unique: true,
    },
    itemDescription: {
      type: String,
      required: true,
    },
    itemType: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

itemSchema.plugin(autoIncrement, {
  inc_field: "itemId",
});
const userCharacterChapter = mongoose.model("item", itemSchema);
export default userCharacterChapter;
