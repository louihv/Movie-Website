import express from 'express';
import axios from 'axios';                   
import Series from '../models/Series.js';

const router = express.Router();

router.get('/', async (req, res) => {          
  try {
    const apiKey = process.env.TMDB_API_KEY;   
    if (!apiKey) {
      return res.status(500).json({ message: 'TMDB API key missing in .env' });
    }

    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/tv/week?api_key=${apiKey}`
    );

    const series = response.data.results.slice(0, 15).map(show => ({
      _id: show.id.toString(),
      title: show.name,
      description: show.overview || "No description available.",
      genre: show.genre_ids?.map(id => {
        const genres = { 
          18: 'Drama', 16: 'Animation', 10759: 'Action & Adventure', 
          10765: 'Sci-Fi & Fantasy', 80: 'Crime', 9648: 'Mystery' 
        };
        return genres[id] || 'Unknown';
      }).filter(Boolean).join(', ') || "Unknown",
      poster: show.poster_path 
        ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
        : "https://via.placeholder.com/300x450?text=No+Poster",
      year: show.first_air_date?.split('-')[0] || "N/A",
      rating: Number(show.vote_average).toFixed(1),
      seasons: show.number_of_seasons || 1
    }));

    res.json({
      page: 1,
      limit: 15,
      total: response.data.total_results,
      data: series
    });

  } catch (err) {
    console.error('TMDB Error:', err);
    res.status(500).json({ message: 'Failed to fetch series', error: err.message });
  }
});

export default router;