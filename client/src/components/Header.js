
import React from 'react';
import styles from './css/Header.module.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';



const Header = () => (
  <header className={styles.head}>
    <h1 id={styles.oncue}>Oncue</h1>
    <nav className={styles.navbar}>
      <Link to="/shows">TV Shows</Link>
      <Link to="/movies">Movies</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/settings">Settings</Link>
    </nav>
  </header>
);

export default Header;
