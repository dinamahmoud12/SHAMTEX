const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
  },

  bigCode: {
    type: String,
  },

  kidsCode: {
    type: String,
  },

  price: {
    type: Number,
    required: true,
  },

  discount: {
    type: Number,
    default: 0,
  },

  finalPrice: {
    type: Number,
  },

  description: {
    type: String,
  },

  category: {
    type: String,
  },

  images: [
    {
      type: String,
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  }

});

module.exports = mongoose.model("Product", ProductSchema);