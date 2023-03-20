var express = require("express");
var router = express.Router();
const User = require("../models/user-model");
const CryptoJS = require("crypto-js");

/* GET home page. */
router.get("/", async function (req, res, next) {
  const users = await User.find();
  res.json(users);
  console.log(users);

  // Show all users, without passwords
});

router.post("/", async function (req, res, next) {
  const userId = req.body;
  const allUsers = await User.find();

  const foundUser = allUsers.find((user) => user._id === userId);

  res.json(foundUser);
  console.log(foundUser);
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
  console.log(user);
});

router.post("/login", function (req, res, next) {
  // Login with email and password
});

module.exports = router;
