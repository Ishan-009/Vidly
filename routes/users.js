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
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("User Already Registered");
  }
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  await user.save();
  res.send(user);
});

module.exports = router;
