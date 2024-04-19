// tofoy93
// x3dbsQStstPBCST2
// mongodb+srv://tofoy93:x3dbsQStstPBCST2@cluster0.hlqrxnz.mongodb.net/

const express = require("express");
const authController = require("./controller/authController");
const filmController = require("./controller/filmController");
const cors = require("cors");
const AppError = require("./utils/appError");
const errorHandler = require("./controller/errorController");
const path = require("path");

const REQUEST_LIMIT = 200;

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const app = express();
app.use(cors());

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.post("/api/v1/register", authController.signUser);

app
  .route("/api/v1/films")
  .get(authController.authenticateKey(REQUEST_LIMIT), filmController.getFilms)
  .post(authController.authenticateKey(REQUEST_LIMIT), filmController.addFilm);

app.get(
  "/api/v1/films/:id",
  authController.authenticateKey(REQUEST_LIMIT),
  filmController.getOneFilm
);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

module.exports = app;

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
