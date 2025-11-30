const express = require("express");
const router = express.Router();
const Session = require("../models/session");
const db = require("../models");

router.post("/", (req, res) => {
  const { userId } = req.body;
  const session = new Session({ userId });
  db.sessions.push(session);
  res.status(201).json(session);
});

module.exports = router;
