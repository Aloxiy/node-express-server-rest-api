const express = require("express");
const router = express.Router();
const Message = require("../models/message");
const db = require("../models");

router.get("/", (req, res) => {
  res.json(db.messages);
});

router.post("/", (req, res) => {
  const message = new Message(req.body);
  db.messages.push(message);
  res.status(201).json(message);
});

module.exports = router;
