const Joi = require("joi");
const { validate, number } = require("joi");
const mongoose = require("mongoose");
const { GenreSchema } = require("./genre"); // imported genre schema to put reference of genre to genreSchema in genre property in movie object.
const Movie = mongoose.model(
  "Movies",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
    genre: {
      type: GenreSchema,
      required: true,
    },
    numberInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
    },
    dailyRentalRate: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
    },
  })
);
// Validation function for handling request inputs

function validateMovies(body) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required(),
  });
  const result = schema.validate(body);
  return result;
}

exports.validate = validateMovies;
exports.Movie = Movie;
