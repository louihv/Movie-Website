import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import logo from '../components/assets/images/logo.png';
import styles from './css/Global.module.css';
import profile from './css/Profile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className={profile.modalOverlay} onClick={onClose}>
      <div className={profile.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={profile.modalClose} onClick={onClose}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
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

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [showVerifyEmail, setShowVerifyEmail] = useState(false);

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '', confirm: '' });
  const [forgotEmail, setForgotEmail] = useState('');
  const [error, setError] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordFeedback, setPasswordFeedback] = useState('');

  // Password visibility toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const calculateStrength = (pass) => {
    let score = 0;
    const feedback = [];

    if (pass.length >= 8) score += 20;
    else feedback.push('At least 8 characters');
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) score += 20;
    else feedback.push('Mix uppercase & lowercase');
    if (/\d/.test(pass)) score += 20;
    else feedback.push('Include numbers');
    if (/[^a-zA-Z0-9]/.test(pass)) score += 20;
    else feedback.push('Add special characters');
    if (pass.length >= 12) score += 20;

    setPasswordStrength(score);
    setPasswordFeedback(feedback.length > 0 ? feedback.join(', ') : 'Strong password!');
  };

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
      setError(err.response?.data?.message || 'Invalid email or password');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (!agreedToTerms) return setError('You must agree to the Terms & Privacy Policy');
    if (registerData.password !== registerData.confirm) return setError('Passwords do not match');
    if (passwordStrength < 60) return setError('Password is too weak');

    try {
      const { confirm, ...dataToSend } = registerData;
      const res = await axios.post('http://localhost:8005/api/users/register', dataToSend);
      setShowRegister(false);
      setShowVerifyEmail(true);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:8005/api/users/forgot-password', { email: forgotEmail });
      setError('Password reset link sent! Check your email.');
      setTimeout(() => setShowForgot(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Email not found');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const closeModals = () => {
    setShowLogin(false);
    setShowRegister(false);
    setShowForgot(false);
    setShowVerifyEmail(false);
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
                <button onClick={handleLogout} className={profile.logoutBtn}>Logout</button>
              </div>
            </>
          ) : (
            <>
              <div className={profile.logoContainer}>
                <img src={logo} alt="Oncue Logo" style={{ width: '80px', height: '80px' }} />
                <span className={profile.logoText}>Oncue</span>
              </div>
              <h1>Leisure within your grasp.</h1>
              <p>You are not signed in.</p>
              <div className={profile.authButtons}>
                <button onClick={() => { closeModals(); setShowLogin(true); }} className={profile.loginBtn}>
                  Login
                </button>
                <button onClick={() => { closeModals(); setShowRegister(true); }} className={profile.registerBtn}>
                  Register
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ==================== LOGIN MODAL ==================== */}
      <Modal isOpen={showLogin} onClose={closeModals} title="Login">
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} required />

          <div className={profile.passwordInput}>
            <input
              type={showLoginPassword ? "text" : "password"}
              placeholder="Password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              required
            />
            <button type="button" onClick={() => setShowLoginPassword(!showLoginPassword)}
              className={profile.eyeIcon}>
              <FontAwesomeIcon icon={showLoginPassword ? faEyeSlash : faEye} />
            </button>
          </div>

          <div className={profile.forgotLink}>
            <button type="button" onClick={() => { closeModals(); setShowForgot(true); }}>
              Forgot Password?
            </button>
          </div>

          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={profile.submit}>Login</button>
        </form>
      </Modal>

      {/* ==================== REGISTER MODAL ==================== */}
      <Modal isOpen={showRegister} onClose={closeModals} title="Create Account">
        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Full Name" value={registerData.name}
            onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })} required />

          <input type="email" placeholder="Email" value={registerData.email}
            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })} required />

          <div className={profile.passwordInput}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={registerData.password}
              onChange={(e) => {
                setRegisterData({ ...registerData, password: e.target.value });
                calculateStrength(e.target.value);
              }}
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}
              className={profile.eyeIcon}>
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>

          <div className={profile.strengthMeter}>
            <div className={profile.strengthBar} style={{
              width: `${passwordStrength}%`,
              background: passwordStrength < 40 ? '#ff4d4d' : passwordStrength < 70 ? '#ffa726' : '#4ade80'
            }} />
          </div>
          <p className={profile.strengthText}>{passwordFeedback}</p>

          <div className={profile.passwordInput}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={registerData.confirm || ''}
              onChange={(e) => setRegisterData({ ...registerData, confirm: e.target.value })}
              required
            />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className={profile.eyeIcon}>
              <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
            </button>
          </div>

          <label className={profile.checkboxContainer}>
            <input type="checkbox" checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)} required />
            <span className={profile.checkmark}></span>
            I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer">Terms</a> and{' '}
            <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
          </label>

          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={profile.submit}>Register</button>
        </form>
      </Modal>

      {/* Email Verification Modal */}
      <Modal isOpen={showVerifyEmail} onClose={closeModals} title="Check Your Email">
        <div className={profile.verifyContent}>
          <h3>Almost there!</h3>
          <p>We've sent a verification link to:</p>
          <strong>{registerData.email}</strong>
          <p style={{ marginTop: '20px' }}>Click the link in the email to activate your account.</p>
          <button onClick={closeModals} className={profile.submit} style={{ marginTop: '20px' }}>
            Got it!
          </button>
        </div>
      </Modal>

      {/* Forgot Password Modal */}
      <Modal isOpen={showForgot} onClose={closeModals} title="Reset Password">
        <form onSubmit={handleForgotPassword}>
          <p>Enter your email and we'll send you a reset link.</p>
          <input type="email" placeholder="Your Email" value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)} required />
          {error && <p className={error.includes('sent') ? profile.success : styles.error}>{error}</p>}
          <button type="submit" className={profile.submit}>Send Reset Link</button>
        </form>
      </Modal>
    </div>
  );
};

export default Profile;