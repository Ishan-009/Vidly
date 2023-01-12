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

const port = process.env.Port || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
