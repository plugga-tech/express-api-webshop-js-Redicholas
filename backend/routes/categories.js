const express = require("express");
const router = express.Router();
const Category = require("../models/category-model");
const Product = require("../models/product-model");

router.get("/", function (req, res, next) {
  try {
    Category.find().then(function (categories) {
      res.send(categories);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/add", function (req, res, next) {
  try {
    const category = new Category({
      name: req.body.name,
    });
    const token = req.body.token;

    if (!token) {
      return res.status(401).json({ message: "Token is required" });
    }

    category.save();
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:category", async function (req, res, next) {
  try {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
