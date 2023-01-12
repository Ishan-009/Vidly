const express = require("express");
const app = express();

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Horror" },
  { id: 3, name: "Romance" },
];

// Routes

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

const port = process.env.Port || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
