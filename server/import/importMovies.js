
import dotenv from "dotenv";
dotenv.config();

import axios from "axios";
import { MongoClient } from "mongodb";

const TMDB_KEY = process.env.TMDB_KEY;
const OMDB_KEY = process.env.OMDB_KEY;
const MONGO_URI = process.env.MONGO_URI;

async function fetchTrendingMovies(page = 1) {
  const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_KEY}&page=${page}`;
  const res = await axios.get(url);
  return res.data; 
}

async function fetchOmdbByTitle(title) {
  const url = `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${OMDB_KEY}`;
  const res = await axios.get(url);
  return res.data.Response === "True" ? res.data : null;
}

// Convert TMDB + OMDb combined data to your schema
function toSchema(tmdb, omdb) {
  return {
    _id: omdb?.imdbID ?? `tmdb_${tmdb.id}`,
    title: tmdb.title,
    year: tmdb.release_date ? parseInt(tmdb.release_date.split("-")[0]) : undefined,
    plot: omdb?.Plot ?? tmdb.overview,
    fullplot: omdb?.Plot ?? tmdb.overview,
    genres: tmdb.genre_ids ? tmdb.genre_ids.map(id => id.toString()) : [],
    runtime: omdb?.Runtime ? parseInt(omdb.Runtime) : undefined,
    cast: omdb?.Actors ? omdb.Actors.split(", ") : [],
    poster: tmdb.poster_path
      ? `https://image.tmdb.org/t/p/w500${tmdb.poster_path}`
      : omdb?.Poster,
    released: tmdb.release_date ? new Date(tmdb.release_date) : undefined,
    directors: omdb?.Director ? omdb.Director.split(", ") : [],
    writers: omdb?.Writer ? omdb.Writer.split(", ") : [],
    countries: omdb?.Country ? omdb.Country.split(", ") : [],
    type: "movie",
    imdb: omdb
      ? {
          rating: parseFloat(omdb.imdbRating),
          votes: parseInt(omdb.imdbVotes?.replace(/,/g, "") || "0"),
          id: omdb.imdbID
        }
      : null,
    lastupdated: new Date().toISOString()
  };
}

async function run() {
  // Connect to Atlas
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  const db = client.db(); // use DB from URI
  const collection = db.collection("movies");

  const allMovies = [];

  // Fetch multiple pages of trending (e.g. first 3 pages)
  for (let page = 1; page <= 3; page++) {
    console.log("Fetching TMDB trending page", page);
    const tmdbData = await fetchTrendingMovies(page);
    for (const tmdbMovie of tmdbData.results) {
      // Fetch OMDb data too (optional)
      const omdbData = await fetchOmdbByTitle(tmdbMovie.title);

      const movieDoc = toSchema(tmdbMovie, omdbData);
      allMovies.push(movieDoc);
    }
  }

  // Deduplicate by _id
  const deduped = Object.values(
    allMovies.reduce((acc, movie) => {
      acc[movie._id] = movie;
      return acc;
    }, {})
  );

  console.log("Total to insert:", deduped.length);

  if (deduped.length > 0) {
    await collection.insertMany(deduped, { ordered: false }).catch(err => {
      console.error("Insert error (maybe duplicates):", err);
    });
  }

  console.log("Done importing.");
  await client.close();
}

run().catch(err => {
  console.error("Error in import:", err);
});
