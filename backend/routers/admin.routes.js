const express = require("express");
const router = express.Router();
const {register, login, logout, authenticate, adminOnly} = require("../controllers/auth.controller")

router.get("/dashboard", authenticate, adminOnly, (req, res) => {
      res.json({message: "Welcome! admin"})
})

module.exports = router