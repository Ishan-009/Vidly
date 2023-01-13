const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { validate } = require("joi");
const mongoose = require("mongoose");

const GenreSchema = new mongoose.Schema({
  name: String,
});

// Convert Schema into model and get result and thus we get a class

const Genres = mongoose.model("genres", GenreSchema);

router.use(express.json());
// Routes
// GET
router.get("/", async (req, res) => {
  const genre = await Genres.find().sort("name");
  res.send(genre);
});

router.get("/:id", async (req, res) => {
  const genre = await Genres.findById(req.params.id);

  if (!genre) {
    res.status(404).send("Genre with given id is not found");
  } else {
    res.send(genre);
  }
});

//POST

router.post("/", async (req, res) => {
  const result = validateGenre(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0]);
    return;
  }
  let genre = new Genres({ name: req.body.name });
  genre = await genre.save();
  res.send(genre);
});

router.put("/:id", async (req, res) => {
  const result = validateGenre(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0]);
    return;
  }
  const genre = await Genres.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  );
  if (!genre) return res.status(404).send("Genre with given id not found");
  res.send(genre);
});

router.delete("/:id", async (req, res) => {
  const genre = await Genres.findByIdAndRemove(req.params.id);
  if (!genre) return res.status(404).send("Genre with given id not found");
  res.send(genre);
});

// Validation function for handling request inputs

function validateGenre(body) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const result = schema.validate(body);
  return result;
}

module.exports = router;
