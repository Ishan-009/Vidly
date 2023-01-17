const Joi = require("joi");
const { validate } = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
});

// Convert Schema into model and get result and thus we get a class

const User = mongoose.model("users", userSchema);

// Validation function for handling request inputs

function validateUser(body) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    phone: Joi.string()
      .length(10)
      .pattern(/[6-9]{1}[0-9]{9}/)
      .required(),
  });
  const result = schema.validate(body);
  return result;
}

exports.validate = validateUser;
exports.User = User;
exports.userSchema = userSchema;
