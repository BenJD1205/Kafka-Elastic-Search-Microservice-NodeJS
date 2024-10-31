const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.router();

router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/validate", authController.validate);

module.exports = router;
