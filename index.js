const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi); // object id validation enable for all files
const customers = require("./routes/customers"); // import customer router
const genres = require("./routes/genres"); // import genres router
const movies = require("./routes/movies"); // import movies router
const rentals = require("./routes/rentals"); // import rentals router
const users = require("./routes/users"); // import users router
const auth = require("./routes/auth"); // import auth router
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("config");
const error = require("./middleware/error");
// Db Connection
mongoose.set("strictQuery", false);

// config jwt key check

if (!config.get("jwtPrivateKey")) {
  console.log("Fatal error: jwtPrivateKey is not defined");
  process.exit(1);
}

const uri = "mongodb://127.0.0.1:27017/vidly";
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }) //connect method return promise
  .then((result) => console.log("connected to mongo db"))
  .catch((err) => console.log(err));

// Middleware
app.use(express.json());
// Routes usage Middleware / router
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users); // using users path routes
app.use("/api/auth", auth);

app.use(error);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
