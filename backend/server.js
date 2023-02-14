const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const moviesRouter = require('./routes/movies')
const membersRouter = require('./routes/members')

require("dotenv").config({ path: "./config.env" });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection established");
});

app.use('/movies', moviesRouter)
app.use('/members', membersRouter)

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
