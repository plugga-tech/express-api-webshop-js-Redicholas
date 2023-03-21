const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  name: { type: String, unique: true },
});

module.exports = mongoose.model("Category", CategorySchema);
