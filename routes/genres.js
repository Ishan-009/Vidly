const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { validate } = require("joi");
const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Horror" },
  { id: 3, name: "Romance" },
];

router.use(express.json());
// Routes
// GET
router.get("/", (req, res) => {
  res.send(genres);
});

router.get("/:id", (req, res) => {
  const genre = genres.find(function (c) {
    return c.id === parseInt(req.params.id);
  });

  if (!genre) {
    res.status(404).send("Genre with given id is not found");
  } else {
    res.send(genre);
  }
});

//POST

router.post("/", (req, res) => {
  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };

  const result = validateCourse(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0]);
    return;
  }

  genres.push(genre);
  res.send(genre);
});

router.put("/:id", (req, res) => {
  const genre = genres.find(function (c) {
    return c.id === parseInt(req.params.id);
  });
  console.log(genre);
  if (!genre) return res.status(404).send("Genre with given id not found");

  const result = validateCourse(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0]);
    return;
  }
  genre.name = req.body.name;
  res.send(genre);
});

router.delete("/:id", (req, res) => {
  const genre = genres.find(function (c) {
    return c.id === parseInt(req.params.id);
  });
  if (!genre) return res.status(404).send("Genre with given id not found");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

// Validation function for handling request inputs

function validateCourse(courseObj) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const result = schema.validate(courseObj);
  return result;
}

module.exports = router;
