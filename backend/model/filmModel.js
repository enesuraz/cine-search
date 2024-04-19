const mongoose = require("mongoose");

const FilmSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A film must have a title"],
      unique: true,
    },
    year: Number,
    released: {
      type: Date,
      required: [true, "A film must have a released year"],
    },
    runtime: {
      type: Number,
      required: [true, "A film must have a runtime"],
    },
    genre: {
      type: [String],
      required: [true, "A film must have a genre at least"],
    },
    director: {
      type: String,
      required: [true, "A film must have a director"],
    },
    actors: {
      type: [String],
      required: [true, "A film must have an actor at least"],
    },
    plot: {
      type: String,
      minlength: [20, "Film plot must be above 20 characters"],
    },
    poster: {
      type: String,
      required: [true, "A film must have a poster"],
    },
    imdbRating: {
      type: Number,
      required: [true, "A film must have a imdb rating"],
    },
    imdbID: {
      type: String,
      required: [true, "A film must have a imdbID"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Film", FilmSchema);
