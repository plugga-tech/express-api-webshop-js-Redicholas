const express = require("express");
const router = express.Router();
const Category = require("../models/category-model");

router.post("/add", function (req, res, next) {
  const category = new Category({
    name: req.body.name,
  });
  const token = req.body.token;

  if (!token) {
    return res.status(401).json({ message: "Token is required" });
  }

  category.save();
  res.json(category);
});

module.exports = router;
