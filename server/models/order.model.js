const { Schema, model } = require("mongoose");
const orderShema = new Schema(
  {
    name: { type: String, required: [true, "Set name "] },
    phone: { type: String, required: [true, "Set phone "] },
    email: { type: String, required: [true, "Set email "] },
    comment: String,
    confirmation: Boolean,
    status: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);
const Order = model("order", orderShema);

module.exports = { Order };
