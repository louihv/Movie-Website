import React from "react";
import styles from "./css/Sidebar.module.css";
import logo from "./resc/logo.png"; 
import { useNavigate } from "react-router-dom";



function Sidebar({ isOpen, toggleSidebar }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/home"); 
      };
    
  return (
    <div className={`${styles.sidebar} `}>
      {/* <button className={styles.close_btn} onClick={toggleSidebar}>
        X
      </button> */}
      <nav>
        <dl className={styles.navig}>
        <img src={logo} alt="logo of the website" onClick={handleClick} className={styles.logo} style={{cursor:"pointer"}} />
        <hr style={{height: "1px", 
        backgroundColor: "#ccc", 
        border: "none"}}/>
          <dt><a href="/shows"><i class='bx bx-tv'></i></a></dt>
          <dt><a href="/movies"><i class='bx bx-movie' ></i></a></dt>
          <dt><a href="/profile"><i class='bx bx-user-circle' ></i></a></dt>
          <hr/>
          <dt><a href="/settings"><i class='bx bx-cog' ></i></a></dt>
        </dl>
      </nav>
    </div>
  );
}

export default Sidebar;
