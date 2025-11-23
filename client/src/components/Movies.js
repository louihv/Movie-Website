import React, { useState, useEffect } from "react";
import movies from './css/Movies.module.css';
import styles from './css/Global.module.css';
import Sidebar from "./Sidebar";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'

const Movies = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [overalls, setOveralls] = useState([]); 
  const [currentIndex, setCurrentIndex] = useState(0); 

  useEffect(() => {
    fetchOveralls();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % overalls.length); 
    }, 10000);

    return () => clearInterval(timer);
  }, [overalls]);

  const fetchOveralls = async () => {
  try {
    const response = await axios.get('http://localhost:8005/api/movies');
    const movies = response.data.data || [];
    console.log('Fetched movies:', movies);
    setOveralls(movies);
  } catch (error) {
    console.error('Error:', error);
    setOveralls([]);
  }
};

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % overalls.length); 
  };

  const handlePreviousClick = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? overalls.length - 1 : prevIndex - 1 
    );
  };

 
  return (
    <div className={styles.show}>
  {/* ---- SIDEBAR ---- */}
  <aside className={styles.sidebar}>
    <Sidebar isOpen={true} toggleSidebar={() => {setIsOpen(!isOpen)}} /> 
    {/* <div className={styles.sideofside}>
      <h1>Genre</h1>
      <p>Horror</p>
      <p>Action</p>
      <p>Adventure</p>
      <p>Sci-Fi</p>
    </div> */}
  </aside>

  <main className={styles.mainContent}>
    <nav className={styles.topBar}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          className={styles.searchBar}
          placeholder="Search..."
        />
        <button className={styles.searchButton}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </nav>

    <section className={styles.galleryContainer}>
      {overalls.length > 0 && (
        <div className={styles.posterContainer}>
          <img
            src={overalls[currentIndex].poster}
            alt={overalls[currentIndex].title}
            className={styles.posterImg}
          />

          {/* Title & description overlay */}
          <div className={styles.texts}>
            <h1>{overalls[currentIndex].title}</h1>
            <p>{overalls[currentIndex].plot || " "}</p>
          </div>

          <div className={styles.arrow}>
            <button onClick={handlePreviousClick} className={styles.leftArrow}>
              <i className="bx bx-chevron-left"></i>
            </button>
            <button onClick={handleNextClick} className={styles.rightArrow}>
              <i className="bx bx-chevron-right"></i>
            </button>
          </div>
        </div>
      )}
   

      <div className={styles.carouselContainer}>
        <ul className={styles.carousel}>
          {overalls.map((movie) => (
            <li key={  movie.id} className={styles.carouselItem}>
              <img
                src={movie.poster}
                alt={movie.title}
              />
            </li>
          ))}
        </ul>
      </div>
      </section>
    
      <section>
      <div className={movies.listContainer}>
      <ul className={movies.list}>
      {overalls.map((movie) => (
        <li key={ movie.id} className={movies.listItem}>
          <img
            src={movie.poster}
            alt={movie.title}
          />
        </li>
      ))}
    </ul>
    </div> 
      </section>

      
  </main>
</div>
  );
};

export default Movies;
