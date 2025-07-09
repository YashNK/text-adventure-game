import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

const autoIncrement = mongooseSequence(mongoose);

const characterSchema = new mongoose.Schema(
  {
    characterId: {
      type: Number,
      unique: true,
    },
    characterName: {
      type: String,
      required: true,
    },
    characterDescription: {
      type: String,
      required: true,
    },
    characterXp: {
      type: Number,
      required: true,
    },
    characterHealth: {
      type: Number,
      required: true,
    },
    attackPower: {
      type: Number,
      required: true,
    },
    specialAbility: {
      type: String,
      required: true,
    },
    characterDefense: {
      type: Number,
      required: true,
    },
    characterMoney: {
      type: Number,
      required: true,
    },
    characterClass: {
      type: String,
      require: true,
    },
    characterAvatar: {
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
