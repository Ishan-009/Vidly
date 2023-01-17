const express = require("express");
const router = express.Router();
const Joi = require("joi");
const mongoose = require("mongoose");
const { User, validate } = require("../models/user");
const _ = require("lodash");
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
  user = new User(_.pick(req.body, ["name", "email", "password"]));
  await user.save();

  res.send(_.pick(user, ["name", "email"]));
});

module.exports = router;
