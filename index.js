const express = require("express");
const app = express();

app.use(express.json());

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Horror" },
  { id: 3, name: "Romance" },
];

// Routes
// GET
app.get("/api/genres", (req, res) => {
  res.send(genres);
});

app.get("/api/genres/:id", (req, res) => {
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

app.post("/api/genres", (req, res) => {
  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };

  genres.push(genre);
  res.send(genre);
});

app.put("/api/genres/:id", (req, res) => {
  const genre = genres.find(function (c) {
    return c.id === parseInt(req.params.id);
  });
  console.log(genre);
  if (!genre) return res.status(404).send("Genre with given id not found");

  genre.name = req.body.name;
  res.send(genre);
});

app.delete("/api/genres/:id", (req, res) => {
  const genre = genres.find(function (c) {
    return c.id === parseInt(req.params.id);
  });
  if (!genre) return res.status(404).send("Genre with given id not found");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});
app.delete("/api/genres/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

const port = process.env.Port || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
console.log(genres);
