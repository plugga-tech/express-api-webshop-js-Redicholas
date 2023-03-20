const express = require("express");
const app = express();
const usersRoute = require("./routes/users.js");
const productsRoute = require("./routes/products.js");
const ordersRoute = require("./routes/orders.js");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/api/users", usersRoute);
app.use("/api/products", productsRoute);
app.use("/api/orders", ordersRoute);

async function init() {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(process.env.DB_URI, options);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

init();
