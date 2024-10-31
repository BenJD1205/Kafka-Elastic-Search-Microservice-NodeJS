const express = require("express");
const router = require("express").Router();
const authRoutes = require("./auth.route");

router.use("/auth", authRoutes);

module.exports = router;
