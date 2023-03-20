const express = require("express");
const router = express.Router();
const Product = require("../models/product-model");

router.get("/", function (req, res, next) {
  // Show all products
});

router.get("/:id", function (req, res, next) {
  // Show single product, by id
});

router.post("/add", function (req, res, next) {
  // Add a new product with name, price, description, lager
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    lager: req.body.lager,
  });

  product.save();

  res.json(product);
  console.log(product);
});

module.exports = router;
