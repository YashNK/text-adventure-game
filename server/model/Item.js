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
      type: String,
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
    healing: {
      type: Number,
      required: false,
    },
    strength: {
      type: Number,
      required: false,
    },
    magic: {
      type: Number,
      required: false,
    },
    sellingCost: {
      type: Number,
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
const Item = mongoose.model("Item", itemSchema);
export default Item;
