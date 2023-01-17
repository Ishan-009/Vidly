const Joi = require("joi");
const customers = require("./routes/customers");
const genres = require("./routes/genres");
const movies = require("./routes/movies");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Db Connection
mongoose.set("strictQuery", false);

const uri = "mongodb://127.0.0.1:27017/vidly";
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }) //connect method return promise
  .then((result) => console.log("connected to mongo db"))
  .catch((err) => console.log(err));

// Middleware
app.use(express.json());
// Routes usage Middleware
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
