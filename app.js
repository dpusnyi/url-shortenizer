const express = require("express");
const logger = require("morgan");

const mappingsRouter = require("./routes/mappings");
const shortURLsRouter = require("./routes/shortURLs");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/mappings", mappingsRouter);
app.use("/", shortURLsRouter);

app.use((err, req, res, next) => {
  if (!err.statusCode) err.statusCode = 500;

  if (process.env.NODE_ENV === "production") {
    res.status(err.statusCode).send(err.message);
  } else {
    // pass to default error handler, it can show stack traces in development
    next(err);
  }
});

module.exports = app;
