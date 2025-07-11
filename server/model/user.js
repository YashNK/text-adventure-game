import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

const autoIncrement = mongooseSequence(mongoose);

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isNewUser: {
      type: Boolean,
    },
  },
  {
    versionKey: false,
  }
);

userSchema.plugin(autoIncrement, { inc_field: "userId" });

const User = mongoose.model("User", userSchema);
export default User;
