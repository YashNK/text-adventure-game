import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

const autoIncrement = mongooseSequence(mongoose);

const monsterSchema = new mongoose.Schema(
  {
    monsterName: {
      type: String,
      required: true,
    },
    monsterHealth: {
      type: Number,
      required: true,
    },
    monsterDamage: {
      type: Number,
      required: true,
    },
    attackMessage: {
      type: String,
      required: true,
    },
    monsterId: {
      type: Number,
      unique: true,
    },
  },
  {
    versionKey: false,
  }
);

monsterSchema.plugin(autoIncrement, { inc_field: "monsterId" });
const Monster = mongoose.model("Monster", monsterSchema);
export default Monster;