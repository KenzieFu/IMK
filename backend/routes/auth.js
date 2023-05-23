const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const authController = require("../controllers/auth");

// POST /perpustakaan/login
// http://localhost:8080/auth/login
router.post("/login", [body("username").trim().not().isEmpty(), body("password").trim().not().isEmpty()], authController.login);

// POST /perpustakaan/logout
// http://localhost:8080/auth/logout
router.post("/logout", authController.logout);

module.exports = router;
