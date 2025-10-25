const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/authenticate");
const {
  login,
  logout,
  refreshToken,
  register,
} = require("../controllers/auth.controller");

router.post("/login", login);
router.post("/logout", authenticate, logout);
router.post("/register", register);
router.post("/refresh-token", refreshToken);

module.exports = router;
