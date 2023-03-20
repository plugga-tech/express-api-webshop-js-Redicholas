const express = require("express");
const router = express.Router();
const Order = require("../models/order-model");

// Add new order
router.post("/add", async function (req, res, next) {
  try {
    const order = new Order({
      user: req.body.user,
      products: req.body.products,
    });

    await order.save();
    res.status(200).json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

// Show all orders
router.get("/all", async function (req, res, next) {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

module.exports = router;
