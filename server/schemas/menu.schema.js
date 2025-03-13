const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  name: { type: String, required: true },
  icon: { type: String },
  parentId: mongoose.Types.ObjectId,
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const menuModel = mongoose.model("Menu", menuSchema);

module.exports = menuModel;
