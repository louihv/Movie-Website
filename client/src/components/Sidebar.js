import React from "react";
import styles from "./css/Sidebar.module.css";
import logo from "./assets/images/logo.png"; 
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome} from '@fortawesome/free-solid-svg-icons'



function Sidebar({ isOpen, toggleSidebar }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/home"); 
      };
    
  return (
    <div className={`${styles.sidebar}`}>
  <nav>
    <dl className={styles.navig}>
      <img
        src={logo}
        alt="logo of the website"
        onClick={handleClick}
        className={styles.logo}
        style={{ cursor: "pointer" }}
      />
      <dt>
        <a href="/home" className={styles.menuItem}>
          <div className={styles.iconWrapper}>
            <ion-icon name="home-outline" class={styles.outline}></ion-icon>
            <ion-icon name="home" class={styles.filled}></ion-icon>
          </div>
          <span className={styles.menuText}>Home</span>
        </a>
      </dt>

      <dt>
        <a href="/shows" className={styles.menuItem}>
          <div className={styles.iconWrapper}>
            <ion-icon name="film-outline" class={styles.outline}></ion-icon>
            <ion-icon name="film" class={styles.filled}></ion-icon>
          </div>
          <span className={styles.menuText}>Shows</span>
        </a>
      </dt>

      <dt>
        <a href="/movies" className={styles.menuItem}>
          <div className={styles.iconWrapper}>
            <ion-icon name="videocam-outline" class={styles.outline}></ion-icon>
            <ion-icon name="videocam" class={styles.filled}></ion-icon>
          </div>
          <span className={styles.menuText}>Movies</span>
        </a>
      </dt>

      <dt>
        <a href="/profile" className={styles.menuItem}>
          <div className={styles.iconWrapper}>
            <ion-icon name="person-circle-outline" class={styles.outline}></ion-icon>
            <ion-icon name="person-circle" class={styles.filled}></ion-icon>
          </div>
          <span className={styles.menuText}>Profile</span>
        </a>
      </dt>

      <dt>
        <a href="/settings" className={styles.menuItem}>
          <div className={styles.iconWrapper}>
            <ion-icon name="settings-outline" class={styles.outline}></ion-icon>
            <ion-icon name="settings" class={styles.filled}></ion-icon>
          </div>
          <span className={styles.menuText}>Settings</span>
        </a>
      </dt>

    </dl>
  </nav>
</div>

  );
}

export default Sidebar;
