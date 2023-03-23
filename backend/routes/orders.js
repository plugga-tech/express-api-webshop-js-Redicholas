const express = require("express");
const router = express.Router();
const Order = require("../models/order-model");
const Product = require("../models/product-model");
require("dotenv").config();

// Add new order
router.post("/add", async function (req, res, next) {
  try {
    const productsOrdered = req.body.products;
    let outOfStockProducts = [];

    await Promise.all(
      productsOrdered.map(async (product) => {
        const foundProduct = await Product.findById(product.productId);
        foundProduct.lager -= product.quantity;

        if (foundProduct.lager < 0) {
          foundProduct.lager = 0;
          outOfStockProducts.push(foundProduct.name);
          return;
        }
        await foundProduct.save();
      })
    );

    if (outOfStockProducts.length > 0) {
      res.json({ message: "Out of stock products: " + outOfStockProducts });
      return;
    }

    const order = new Order({
      user: req.body.user,
      products: req.body.products,
    });

    await order.save();

    return res
      .status(200)
      .json({ order, message: "Order placed successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
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

router.post("/user", async function (req, res, next) {
  try {
    if (req.body.token !== process.env.TOKEN) {
      return res.status(401).json({ message: "Token is required" });
    }

    const userOrders = await Order.find({ user: req.body.user });
    res.status(200).json(userOrders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

module.exports = router;
