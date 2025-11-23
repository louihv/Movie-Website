import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import styles from './css/Global.module.css';
import profile from './css/Profile.module.css';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className={profile.modalOverlay} onClick={onClose}>
      <div className={profile.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose}>×</button>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
};

const Profile = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Only one modal can be open at a time
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ email: '', password: '', confirm: '', name: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:8005/api/users/login', loginData);
      const userData = res.data.user;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      setShowLogin(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (registerData.password !== registerData.confirm) {
      setError('Passwords do not match');
      return;
    }
    try {
      const { confirm, ...dataToSend } = registerData;
      const res = await axios.post('http://localhost:8005/api/users/register', dataToSend);
      const userData = res.data.user;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      setShowRegister(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Helper to close any open modal
  const closeModals = () => {
    setShowLogin(false);
    setShowRegister(false);
    setError('');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.show}>
      <Sidebar isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />

      <div className={profile.profileContainer}>
        <div className={profile.profileCard}>
          {user ? (
            <>
              <div className={profile.avatar}>
                <div className={profile.avatarCircle}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </div>
              <h1>Welcome back,</h1>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              <div className={profile.profileActions}>
                <button className={profile.editBtn}>Edit Profile</button>
                <button onClick={handleLogout} className={profile.logoutBtn}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <h1>Embrace the liberty of leisure.</h1>
              <p>You are not signed in.</p>
              <div className={profile.authButtons}>
                <button
                  onClick={() => { closeModals(); setShowLogin(true); }}
                  className={profile.loginBtn}
                >
                  Login
                </button>
                <button
                  onClick={() => { closeModals(); setShowRegister(true); }}
                  className={profile.registerBtn}
                >
                  Register
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Login Modal */}
      <Modal isOpen={showLogin} onClose={closeModals} title="Login">
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            required
          />
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit">Login</button>
        </form>
      </Modal>

      {/* Register Modal */}
      <Modal isOpen={showRegister} onClose={closeModals} title="Create Account">
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            value={registerData.name}
            onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={registerData.email}
            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={registerData.password}
            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={registerData.confirm || ''}
            onChange={(e) => setRegisterData({ ...registerData, confirm: e.target.value })}
            required
          />
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit">Register</button>
        </form>
      </Modal>
    </div>
  );
};

export default Profile;