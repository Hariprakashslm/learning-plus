const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  menuId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Menu',
    default: null,
  },
  data: { type: String, required: true },
  order: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const contentModel = mongoose.model('Content', contentSchema);

module.exports = contentModel;
