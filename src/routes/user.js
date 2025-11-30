const express = require("express");
const router = express.Router();
const User = require("../models/user");
const db = require("../models");

router.get("/", (req, res) => {
  res.json(db.users);
});

router.post("/", (req, res) => {
  const user = new User(req.body);
  db.users.push(user);
  res.status(201).json(user);
});

module.exports = router;
