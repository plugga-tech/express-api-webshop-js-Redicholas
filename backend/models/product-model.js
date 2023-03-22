const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  description: { type: String },
  price: { type: Number, required: true },
  lager: { type: Number },
  category: { type: String, ref: "Category" },
});

module.exports = mongoose.model("Product", ProductSchema);
