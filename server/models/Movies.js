const mongoose = require('mongoose');
 
const MovieSchema = new mongoose.Schema({
  name: String,
  description: String,
  genre: String,
  url: String,
  poster: String,
});
 
const MovieModel = mongoose.model("movies", MovieSchema);
 
module.exports = MovieModel;