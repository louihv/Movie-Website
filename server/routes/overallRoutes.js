import express from 'express';
import Movie from '../models/Movies.js'; 

const router = express.Router();

router.get('/all', async (req, res) => {
  try {
    const movies = await Movie.find({})
      .select('title plot genres poster')
      .limit(10)
      .lean();

    const overalls = movies.map(movie => ({
      _id: movie._id,
      name: movie.title,
      description: movie.plot || "No description available.",
      genre: Array.isArray(movie.genres) ? movie.genres.join(', ') : "Unknown",
      url: movie.poster || "https://via.placeholder.com/300x450?text=No+Poster"
    }));

    res.json(overalls);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
