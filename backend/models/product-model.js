const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  lager: { type: Number },
});

module.exports = mongoose.model("Product", ProductSchema);
