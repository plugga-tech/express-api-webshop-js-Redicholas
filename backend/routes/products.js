const express = require("express");
const router = express.Router();
const Product = require("../models/product-model");
require("dotenv").config();

// Show all products
router.get("/", async function (req, res, next) {
  try {
    const products = await Product.find();
    console.log(products);
    res.json(products);
  } catch (error) {
    console.log(error);
  }
});

// Show a single product by id
router.get("/:id", async function (req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    console.log(error);
  }
});

// Add a product
router.post("/add", function (req, res, next) {
  try {
    if (req.body.token != process.env.TOKEN) {
      return res.status(401).json({ message: "Token is required" });
    }
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      lager: req.body.lager,
      category: req.body.category,
    });

    product.save();

    res.json(product);
  } catch (error) {
    res.status(401).json({ message: "Error" });
    console.log(error);
  }
});

router.get("/category/:category", async function (req, res, next) {
  try {
    const category = req.params.category;
    const foundProducts = await Product.find({ category: category });
    res.status(200).json(foundProducts);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
