const express = require("express");

const router = express.Router();

const Shipping =
  require("../models/Shipping");


// GET ALL SHIPPING

router.get("/", async (req, res) => {

  try {

    const shipping =
      await Shipping.find();

    res.json(shipping);

  } catch (error) {

    res.status(500).json(error);

  }

});


// CREATE SHIPPING

router.post("/", async (req, res) => {

  try {

    const newShipping =
      new Shipping(req.body);

    const saved =
      await newShipping.save();

    res.json(saved);

  } catch (error) {

    res.status(500).json(error);

  }

});


// UPDATE SHIPPING

router.put("/:id", async (req, res) => {

  try {

    const updated =
      await Shipping.findByIdAndUpdate(

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