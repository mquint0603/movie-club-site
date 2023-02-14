const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: { type: String, required: true, unique: true },
  year: { type: String, required: true },
  director: { type: String, required: true },
  picker: { type: String, required: true },
  animated: {type: String},
  rating: {type: String},
  genre: {type: String},
  awards: {type: String},
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
