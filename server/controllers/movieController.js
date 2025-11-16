import MovieModel from '../models/Movies.js'; // <-- use .js extension

export const getMovies = (req, res) => {
  MovieModel.find()
    .then(movies => res.json(movies))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};
