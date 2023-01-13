const mongoose = require("mongoose");
const Joi = require("joi");
const { validate, boolean } = require("joi");
const CustomerSchema = new mongoose.Schema({
  isGold: {
    type: Boolean,
    default: false,
  },
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
  phone: { type: Number, required: true, minlength: 5, maxlength: 50 },
});
// Convert Schema into model and get result and thus we get a class

const Customer = mongoose.model("customer", CustomerSchema);

function validateCustomer(body) {
  const schema = Joi.object({
    isGold: Joi.boolean().required(),
    name: Joi.string().min(5).max(40).required(),
    phone: Joi.number().required(),
  });
  const result = schema.validate(body);
  return result;
}

exports.validate = validateCustomer;
exports.Customer = Customer;
