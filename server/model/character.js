import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

const autoIncrement = mongooseSequence(mongoose);

const characterSchema = new mongoose.Schema(
  {
    characterId: {
      type: Number,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    health: {
      type: Number,
      required: true,
    },
    attackPower: {
      type: Number,
      required: true,
    },
    specialAbility: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    class: {
      type: String,
      require: true,
    },
    avatar: {
      type: String,
      required: false,
    },
  },
  {
    versionKey: false,
  }
);

characterSchema.plugin(autoIncrement, { inc_field: "characterId" });

const Character = mongoose.model("Character", characterSchema);
export default Character;
