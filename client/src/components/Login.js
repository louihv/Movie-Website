import React, { useState, useEffect } from "react";
import styles from './css/Login.module.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
    } else {
      setError('');
      navigate("/home"); 

    }
  };

  return (
    <div>
      <section className={styles.login}>
      <div className={styles.blob_outer_container}>
    <div className={styles.blob_inner_container}>
        <div className={styles.blob}></div>
    </div>
        </div>
        <div className={styles.loginContainer}>
            <div className={styles.right}>
            <h1>Welcome Back!</h1>
            {error && <p className={styles.error_message}>{error}</p>}
            <form className={styles.login_form} onSubmit={handleLogin}>
            <div className={styles.input_group}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div className={styles.input_group}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className={styles.login_button}>
          Log In
        </button>
            </form>
        </div>
        </div>
      </section>
    </div>
  )
}

export default Login
