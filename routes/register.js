var express = require("express");
const { route } = require(".");
var router = express.Router();
var middleware = require("../middlewares/register");

/* GET register page. */
router.post(
  "/",
  middleware.verifyNames,
  middleware.registerUser,
  (req, res) => {
    res.send("Usuario cadastrado");
  }
);

router.get("/", (req, res) => {});

module.exports = router;
