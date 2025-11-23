import express from 'express';
const router = express.Router();

const TMDB_KEY = process.env.REACT_APP_TMDB_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE = 'https://image.tmdb.org/t/p/w500'; 

const withImages = (items) => {
  return items.map(item => ({
    ...item,
    poster: item.poster_path ? `${IMG_BASE}${item.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image',
    backdrop: item.backdrop_path ? `${IMG_BASE}${item.backdrop_path}` : null
  }));
};

router.get('/trending', async (req, res) => {
  try {
    const resApi = await fetch(`${BASE_URL}/trending/all/week?api_key=${TMDB_KEY}`);
    const data = await resApi.json();
    res.json({
      page: data.page,
      total_pages: data.total_pages,
      results: withImages(data.results)
    });
  } catch (err) {
    res.status(500).json({ error: 'TMDB Error' });
  }
});

router.get('/movies/popular', async (req, res) => {
  try {
    const resApi = await fetch(`${BASE_URL}/movie/popular?api_key=${TMDB_KEY}&page=1`);
    const data = await resApi.json();
    res.json({
      results: withImages(data.results)
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

router.get('/series/popular', async (req, res) => {
  try {
    const resApi = await fetch(`${BASE_URL}/tv/popular?api_key=${TMDB_KEY}&page=1`);
    const data = await resApi.json();
    const series = data.results.map(show => ({
      _id: show.id,
      title: show.name,
      name: show.name,
      overview: show.overview,
      poster: show.poster_path ? `${IMG_BASE}${show.poster_path}` : null,
      first_air_date: show.first_air_date,
      vote_average: show.vote_average,
      genre_ids: show.genre_ids
    }));
    res.json({ results: series });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch series' });
  }
});

router.get('/search', async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: 'Query required' });

  try {
    const resApi = await fetch(
      `${BASE_URL}/search/multi?api_key=${TMDB_KEY}&query=${encodeURIComponent(query)}`
    );
    const data = await resApi.json();
    res.json({
      results: withImages(data.results).map(item => ({
        ...item,
        title: item.title || item.name,
        release_date: item.release_date || item.first_air_date
      }))
    });
  } catch (err) {
    res.status(500).json({ error: 'Search failed' });
  }
});

export default router;