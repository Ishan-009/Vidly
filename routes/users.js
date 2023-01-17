const express = require("express");
const router = express.Router();
const Joi = require("joi");
const mongoose = require("mongoose");
const { User, validate } = require("../models/user");
router.use(express.json());

//POST

router.post("/register", async (req, res) => {
  const result = validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0]);
    return;
  }
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  });
  await user.save();
  res.send(user);
});

module.exports = router;
