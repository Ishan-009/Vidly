const admin = require("../middleware/admin"); // Admin Middleware
const auth = require("../middleware/auth"); // Authorization Middleware
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const mongoose = require("mongoose");
const { Genres, validate } = require("../models/genre");
router.use(express.json());
// Routes
// GET
router.get("/", auth, async (req, res) => {
  try {
    const genre = await Genres.find().sort("name");
    res.send(genre);
  } catch (ex) {
    next(ex);
  }
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

// Here in this route request handler we have passed two middleware one checks if user is authorized logged in or not  or not and other checks admin access to perform the following operation i.ee deleting genre
router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genres.findByIdAndRemove(req.params.id);
  if (!genre) return res.status(404).send("Genre with given id not found");
  res.send(genre);
});

module.exports = router;
