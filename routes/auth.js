const express = require("express");
const router = express.Router();
const Joi = require("joi");
const mongoose = require("mongoose");
const { User } = require("../models/user");
const _ = require("lodash");
// import jsonwebtoken
const jwt = require("jsonwebtoken");

const config = require("config");
router.use(express.json());

// hashing
const bcrypt = require("bcrypt");

//POST

router.post("/", async (req, res) => {
  const result = validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0]);
    return;
  }
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Invalid Email or Password");
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) {
    return res.status(400).send("Invalid Email or Password");
  }
  const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey")); // for now jwt key is hardcoded
  res.send(token);
});

function validate(body) {
  const schema = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string().min(5).max(255).required(),
    // phone: Joi.string()
    //   .length(10)
    //   .pattern(/[6-9]{1}[0-9]{9}/)
    //   .required(),
  });
  const result = schema.validate(body);
  return result;
}
module.exports = router;
