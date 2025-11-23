import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './css/Home.module.css';
import Header from './Header';

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div>
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
              style={{ display: 'none' }}
            />
            <span
              style={{
                color: ratingValue <= (hover || rating) ? 'gold' : 'gray',
                fontSize: '30px',
                cursor: 'pointer',
              }}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
            >
              ★
            </span>
          </label>
        );
      })}
    </div>
  );
};

const Home = () => {
  const [movies, setMovies] = useState([]); 
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchTrending();
  }, []);

  useEffect(() => {
    if (movies.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [movies]);

  const fetchTrending = async () => {
    try {
      const response = await axios.get('http://localhost:8005/api/tmdb/trending');
      console.log('TMDB Response:', response.data);

      const results = response.data.results || response.data.data || [];
      
      const formatted = results.map(item => ({
        _id: item.id,
        name: item.title || item.name,          
        description: item.overview || "No description available.",
        genre: item.genre_ids?.[0] ? "Action, Drama" : "Various", 
        url: item.poster_path 
          ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
          : "https://via.placeholder.com/300x450?text=No+Image",
        year: item.release_date?.split('-')[0] || item.first_air_date?.split('-')[0] || "N/A",
        rating: item.vote_average?.toFixed(1)
      }));

      setMovies(formatted);
    } catch (error) {
      console.error('Error fetching trending:', error);
      setMovies([]);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
  };

  if (movies.length === 0) {
    return <div className={styles.home}>
      <Header />
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
      <p className={styles.loadingText}>Loading trending movies & shows...</p></div>
    </div>
  }

  const current = movies[currentIndex];

  return (
    <div className={styles.home}>
      <Header />

      <main>
        <section>
          <div className={styles.content}>
            <div className={styles.keep} key={current._id}>
              <div className={styles.texts}>
                <h1>{current.name}</h1>
                <span><h2>({current.year})</h2></span>
                <p>{current.description}</p>
                <h3>{current.genre} • ★ {current.rating}</h3>
                <StarRating />
              </div>

              <div className={styles.clearfix}>
                <img
                  src={current.url}
                  alt={current.name}
                />
              </div>
            </div>

            <button onClick={handlePrev} className={styles.arrow} id={styles.left_arrow}>
              <i className='bx bx-chevron-left'></i>
            </button>

            <button onClick={handleNext} className={styles.arrow} id={styles.right_arrow}>
              <i className='bx bx-chevron-right'></i>
            </button>
          </div>
        </section>

        <section>
          <h2 className={styles.carouselHeading}>
           Trending This Week
          </h2>
          <ul className={styles.carouselContainer}>
            {movies.map((item) => (
              <li key={item._id} className={styles.carouselItem}>
                <img 
                  src={item.url} 
                  alt={item.name}
                />
                <p >
                  {item.name}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Home;