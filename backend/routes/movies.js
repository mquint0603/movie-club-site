const router = require("express").Router();
let Movie = require("../models/movie.model");

// Return all movies
router.route("/").get((req, res) => {
  const sortParam = req.query.sort || "title";
  const sortOrder = req.query.sortOrder || "asc";

  Movie.find({})
    .sort({ [sortParam]: sortOrder, title: "asc" })
    .then((movies) => res.json(movies))
    .catch((err) => res.json(err));
});

// Return one movie
router.route("/:id").get((req, res) => {
  Movie.findById(req.params.id)
    .then((movie) => res.json(movie))
    .catch((err) => res.status(400).json(err));
});

// Create new movie
router.route("/add").post((req, res) => {
  const newMovie = new Movie({ ...req.body });
  newMovie
    .save()
    .then(() => res.json("Movie added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Edit movie
router.route("/update/:id").post((req, res) => {
  const { title, year, director, picker, genre, rating } = req.body;
  Movie.findById(req.params.id)
    .then((movie) => {
      movie.title = title;
      movie.picker = picker;
      movie.year = year;
      movie.director = director;
      movie.genre = genre;
      movie.rating = rating;

      movie
        .save()
        .then(() => res.json("Exercise updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// Delete movie
router.route("/:id").delete((req, res) => {
  Movie.findByIdAndDelete(req.params.id)
    .then(() => res.json("Movie deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
