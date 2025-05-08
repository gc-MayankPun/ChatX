const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
  },
  { timestamps: true }
);

const UserModel = model("User", UserSchema);
module.exports = UserModel;
