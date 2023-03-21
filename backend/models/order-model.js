const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  user: { type: String, required: true, ref: "User" },
  products: [
    {
      productId: {
        type: [mongoose.Types.ObjectId],
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model("Order", OrderSchema);
