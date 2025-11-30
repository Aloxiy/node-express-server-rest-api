const express = require("express");
const userRoutes = require("./user");
const messageRoutes = require("./message");
const sessionRoutes = require("./session");

const router = express.Router();

router.use("/users", userRoutes);
router.use("/messages", messageRoutes);
router.use("/sessions", sessionRoutes);

module.exports = router;
