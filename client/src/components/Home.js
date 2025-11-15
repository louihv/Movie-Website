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
      const response = await axios.get('http://localhost:8005/api/all');
      console.log(response.data); 
      setOveralls(response.data);
    } catch (error) {
      console.error('Error fetching overall data:', error);
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
    <div className={styles.Home}>
      <Header />

      <main>
        <section>
          <div className={styles.content}>
            {overalls.length > 0 && (
              <div className={styles.keep}
                key={overalls[currentIndex]._id}
                style={{
                  marginBottom: '20px',
                  paddingBottom: '10px',
                }}
              >
                <div className={styles.texts}>
                <h1>{overalls[currentIndex].name}</h1>
                <p>{overalls[currentIndex].description}</p>
                <h3>{overalls[currentIndex].genre}</h3>
                <StarRating />
                </div>
                {overalls[currentIndex].url && (
                  <div className={styles.clearfix}>
                    <img
                      src={overalls[currentIndex].url}
                      alt={overalls[currentIndex].name}
                    />
                  </div>
                )}
              </div>
            )}

            <button 
              onClick={handlePreviousClick} 
              disabled={overalls.length === 0}
              className={styles.arrow}
              id={styles.left_arrow}
            >
              <i className='bx bx-chevron-left'></i>
            </button>

            <button 
              onClick={handleNextClick} 
              disabled={overalls.length === 0}
              className={styles.arrow}
              id={styles.right_arrow}
            >
               <i className='bx bx-chevron-right'></i>
            </button>
          </div>
        </section>
        <section>
        <ul className={styles.carousel_container}>
          {overalls.map((item) => (
            <li key={item.id} className={styles.carousel_item}>
            <img src={item.url} alt={`Item ${item.id}`} />
          </li>
          ))}
        </ul>
        </section>
      </main>
    </div>
  );
};

export default Home;
