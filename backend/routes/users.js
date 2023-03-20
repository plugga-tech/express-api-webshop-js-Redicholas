var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("Users route");

  // Show all users, without passwords
});

router.post("/", function (req, res, next) {
  // Show specific user object, by id
});

router.post("/add", function (req, res, next) {
  // Add a new user
});

router.post("/login", function (req, res, next) {
  // Login with email and password
});

module.exports = router;
