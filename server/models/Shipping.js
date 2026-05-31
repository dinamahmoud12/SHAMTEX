const mongoose = require("mongoose");

const shippingSchema = new mongoose.Schema({

  governorate: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

});

module.exports =
  mongoose.model(
    "Shipping",
    shippingSchema
  );