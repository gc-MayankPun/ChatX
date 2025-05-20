const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      minLength: 3,
      maxLength: 20,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      trim: true,
    },
    isActive: Boolean,
    avatarURL: String,
    generalMessages: [
      {
        type: Schema.Types.ObjectId,
        ref: "GeneralChat",
      },
    ],
  },
  { timestamps: true }
);

const UserModel = model("User", UserSchema);
module.exports = UserModel;
