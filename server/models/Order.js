const mongoose = require("mongoose");

const orderSchema =
  new mongoose.Schema(

    {

      customerName: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },

      governorate: {
        type: String,
        required: true,
      },

      address: {
        type: String,
        required: true,
      },

      productTitle: {
        type: String,
        required: true,
      },

      productPrice: {
        type: Number,
        required: true,
      },

      shippingPrice: {
        type: Number,
        required: true,
      },

      totalPrice: {
        type: Number,
        required: true,
      },

      status: {
        type: String,

        default: "جديد",
      },

    },

    {
      timestamps: true,
    }

  );

module.exports =
  mongoose.model(
    "Order",
    orderSchema
  );