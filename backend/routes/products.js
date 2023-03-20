var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  // Show all products
});

router.get("/:id", function (req, res, next) {
  // Show single product, by id
});

router.post("/add", function (req, res, next) {
  // Add a new product with name, price, description, lager
});

module.exports = router;
