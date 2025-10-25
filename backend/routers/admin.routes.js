const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/authenticate");
const { adminOnly } = require("../middlewares/adminOnly");

router.get("/dashboard", authenticate, adminOnly, (req, res) => {
  res.json({ message: "Welcome! admin" });
});

module.exports = router;
