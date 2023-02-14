const router = require("express").Router();
let Movie = require("../models/movie.model");

router.route("/").get((req, res) => {
  const sortParam = req.query.sort || 'title';
  const sortOrder = req.query.sortOrder || 'asc';
  
  Movie.find({}).sort({[sortParam]: sortOrder, 'title': 'asc'})
    .then((movies) => res.json(movies))
    .catch((err) => res.json(err));
});

router.route("/:id").get((req, res) => {
    Movie.findById(req.params.id)
      .then((movie) => res.json(movie))
      .catch((err) => res.status(400).json(err));
  });

router.route("/add").post((req, res) => {
  const { title, year, director, picker } = req.body;
  const newMovie = new Movie({ title, year, director, picker });

  newMovie
    .save()
    .then(() => res.json("Movie added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
