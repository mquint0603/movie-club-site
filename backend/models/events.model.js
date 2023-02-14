const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  date: { type: Date, required: true, unique: true },
  location: { type: String, required: true },
  picker: { type: String, required: true },
});

const Movie = mongoose.model("Event", eventSchema);

module.exports = Event;