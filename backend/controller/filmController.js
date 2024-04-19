const Film = require("../model/filmModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.addFilm = catchAsync(async (req, res, next) => {
  const film = await Film.create(req.body);

  res.status(201).json({
    status: "ok",
    data: {
      film,
    },
  });
});

exports.getFilms = catchAsync(async (req, res, next) => {
  let filteredFilms = Film.find().select("-__v,-createdAt,-updatedAt");
  const searchQuery = req.query.q?.split(",");
  const filteredQueries = searchQuery?.map((q) => q.toLowerCase());

  if (searchQuery)
    filteredFilms.find({
      $or: [
        { genre: { $in: filteredQueries } },
        { actors: { $in: searchQuery } },
      ],
    });

  const films = await filteredFilms;

  res.status(201).json({
    status: "ok",
    results: films.length,
    data: {
      films,
    },
  });
});

exports.getOneFilm = catchAsync(async (req, res, next) => {
  const film = await Film.findById(req.params.id);
  if (!film) next(new AppError("Film not found", 404));
  res.status(200).json({
    status: "ok",
    data: {
      film,
    },
  });
});
