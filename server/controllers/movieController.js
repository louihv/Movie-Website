const MovieModel = require('../models/Movies'); // Ensure the filename is correct

const getMovies = (req, res) => {
  MovieModel.find()
    .then(movies => res.json(movies))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

module.exports = {getMovies};