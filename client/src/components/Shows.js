import React, { useState, useEffect } from "react";
import styles from './css/Shows.module.css';
import Sidebar from "./Sidebar";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'

const Shows = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [overalls, setOveralls] = useState([]); 
  const [currentIndex, setCurrentIndex] = useState(0); 

  useEffect(() => {
    fetchOveralls();
  }, []);

  useEffect(() => {
    // Set up a 10-second timer to update the currentIndex
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % overalls.length); // Loop back to the start
    }, 10000);

    // Cleanup function to clear the interval on unmount
    return () => clearInterval(timer);
  }, [overalls]);

  const fetchOveralls = async () => {
    try {
      const response = await axios.get('http://localhost:8005/api/getMovies');
      console.log(response.data); 
      setOveralls(response.data);
    } catch (error) {
      console.error('Error fetching overall data:', error);
    }
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % overalls.length); // Loop back to the start
  };

  const handlePreviousClick = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? overalls.length - 1 : prevIndex - 1 // Loop back to the last item
    );
  };

 
  return (
    <div className={styles.show}>
      <nav className={styles.topBar}>
      <div className={styles.search_container}>
      <input type="text"
       id={styles.searh_bar} 
       className={styles.search_bar}
      placeholder="Search..."/>
    <button className={styles.search_button}>
  <FontAwesomeIcon icon={faMagnifyingGlass} />  </button>
</div>

      </nav>

      <div className={styles.sidebar}>
        <Sidebar isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />
        <div className={styles.sideofside}>
          <h1>Genre</h1>
          <p>Horror</p>
          <p>Action</p>
          <p>Adventure</p>
          <p>Sci-Fi</p>
        </div>
    
          <section>
          <div className={styles.content}>
            {overalls.length > 0 && (
              <div className={styles.keep}
                key={overalls[currentIndex]._id}
                style={{
                  marginBottom: '20px',
                  //paddingBottom: '10px',
                }}
              >
                {overalls[currentIndex].poster && (
                  <div className={styles.clearfix}>
                    <img
                      src={overalls[currentIndex].poster}
                      alt={overalls[currentIndex].name}
                    />
                  </div>
                )}
                 <div className={styles.texts}>
                <h1>{overalls[currentIndex].name}</h1>
                <p>{overalls[currentIndex].description}</p>
                <h3>{overalls[currentIndex].genre}</h3>
                </div>
              </div>
            )}
           <div className={styles.arrow}>
            <button 
              onClick={handlePreviousClick} 
              disabled={overalls.length === 0}
              className={styles.left_arrow}
            >
              <i className='bx bx-chevron-left'></i>
            </button>

            <button 
              onClick={handleNextClick} 
              disabled={overalls.length === 0}
              className={styles.right_arrow}
              style={{left:'0'}}
            >
               <i className='bx bx-chevron-right'></i>
            </button>
            </div>
          </div>
        </section>
        
        <section>
        <ul className={styles.carousel_container}>
          {overalls.map((item) => (
            <li key={item.id} className={styles.carousel_item}>
            <img src={item.url} alt={`Image for item ${item.id}`} />
          </li>
          ))}
        </ul>
        </section>
      </div>
    </div>
  );
};

export default Shows;
