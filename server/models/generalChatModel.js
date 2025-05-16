const { Schema, model, ObjectId } = require("mongoose");

const GeneralChatSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
      trim: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const GeneralChatModel = model("GeneralChat", GeneralChatSchema);
module.exports = GeneralChatModel;
