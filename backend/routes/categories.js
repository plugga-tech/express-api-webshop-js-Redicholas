const express = require("express");
const router = express.Router();
const Category = require("../models/category-model");
const Product = require("../models/product-model");
require("dotenv").config();

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
  if (req.body.token != process.env.TOKEN) {
    return res.status(401).json({ message: "Token is required" });
  }
  try {
    const category = new Category({
      name: req.body.name,
    });

    category.save().catch((error) => {
      if (error.code === 11000) {
        return res.status(400).json({ message: "Category already exists" });
      }
      return res.status(200).json(category);
    });
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
