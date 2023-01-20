const express = require("express");
const router = express.Router();
const Joi = require("joi");
const mongoose = require("mongoose");
const { User, validate } = require("../models/user");
const _ = require("lodash");
router.use(express.json());

const config = require("config");
const jwt = require("jsonwebtoken");
// hashing
const bcrypt = require("bcrypt");

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
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));

  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
