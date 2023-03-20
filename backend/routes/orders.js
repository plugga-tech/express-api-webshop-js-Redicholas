const express = require("express");
const router = express.Router();
const Order = require("../models/order-model");

router.post("/add", function (req, res, next) {
  // Add a product

  const order = new Order({
    user: req.body.user,
    products: req.body.products,
  });

  order.save();
  res.send(order);
  console.log(order);
});

router.get("/all", function (req, res, next) {
  // Show all products
});

module.exports = router;
