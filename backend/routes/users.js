const express = require("express");
const router = express.Router();
const User = require("../models/user-model");
const CryptoJS = require("crypto-js");

// Show all users, hide password
router.get("/", async function (req, res, next) {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    console.log(error);
  }
});

// Show a single user by id
router.post("/", async function (req, res, next) {
  try {
    const userId = req.body;
    const allUsers = await User.find();

    const foundUser = allUsers.find((user) => user._id === userId);

    res.json(foundUser);
  } catch (error) {
    console.log(error);
  }
});

// Add a user
router.post("/add", function (req, res, next) {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SALT
    ).toString(),
  });

  user
    .save()
    .then((result) => {
      return res.status(201).json({
        message: "Successful registration.",
        data: { email: result.email },
      });
    })
    .catch((err) => {
      if (err.name === "MongoServerError" && err.code === 11000) {
        return res.status(400).json({
          message: "Email already in use.",
          data: { err },
        });
      }
      return res.status(400).json({
        message: "You didn't give us what we want!",
        data: { err },
      });
    });
});

//   user.save((err) => {
//     console.log("NÅT GICK FEL!");
//     if (err && err.code !== 11000) {
//       console.log(err);
//       console.log(err.code);
//       res.json({ err });
//       return;
//     }
//     if (err && err.code === 11000) {
//       console.log("error", "User already exists");
//       res.json({ err });
//       return;
//     }

//     res.json({ ok });
//   });
//   res.json(user);
// } catch (error) {
//   console.log(error);
//   // if (error.code === 11000) {
//   //   res.status(409).json({ message: "Email already exists" });
//   // } else {
//   //   console.log(error);
//   // }
// }
// });

// Login
router.post("/login", async function (req, res, next) {
  try {
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
        res.status(401).json({ message: "Wrong password" });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
