const express = require("express");
const router = express.Router();
const Joi = require("joi");
const mongoose = require("mongoose");
const { Genres, validate } = require("../models/genre");
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
  const result = validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0]);
    return;
  }
  let genre = new Genres({ name: req.body.name });
  genre = await genre.save();
  res.send(genre);
});

router.put("/:id", async (req, res) => {
  const result = validate(req.body);
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

module.exports = router;
