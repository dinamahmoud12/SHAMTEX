const express = require("express");

const router = express.Router();

const Order =
  require("../models/Order");


// GET ALL ORDERS

router.get("/", async (req, res) => {

  try {

    const orders =
      await Order.find().sort({
        createdAt: -1,
      });

    res.json(orders);

  } catch (error) {

    res.status(500).json(error);

  }

});


// CREATE ORDER

router.post("/", async (req, res) => {

  try {

    const newOrder =
      new Order(req.body);

    const saved =
      await newOrder.save();

    res.json(saved);

  } catch (error) {

    res.status(500).json(error);

  }

});


// UPDATE STATUS

router.put("/:id", async (req, res) => {

  try {

    const updated =
      await Order.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
          new: true,
        }

      );

    res.json(updated);

  } catch (error) {

    res.status(500).json(error);

  }

});

module.exports = router;