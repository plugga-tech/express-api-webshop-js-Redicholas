const express = require("express");
const router = express.Router();
const User = require("../models/user-model");
const CryptoJS = require("crypto-js");

router.get("/", async function (req, res, next) {
  const users = await User.find().select("-password");
  res.json(users);
});

router.post("/", async function (req, res, next) {
  const userId = req.body;
  const allUsers = await User.find();

  const foundUser = allUsers.find((user) => user._id === userId);

  res.json(foundUser);
});

router.post("/add", function (req, res, next) {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SALT
    ).toString(),
  });

  user.save();

  res.json(user);
});

router.post("/login", async function (req, res, next) {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    const decryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SALT
    ).toString(CryptoJS.enc.Utf8);

    if (decryptedPassword === req.body.password) {
      user.isLoggedIn = true;
      res.json(user);
    } else {
      res.json({ message: "Wrong password" });
    }
  }
});

module.exports = router;
