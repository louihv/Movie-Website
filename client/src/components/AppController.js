import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'; // Import Navigate for redirect
import Home from './Home.js';
import Shows from './Shows.js';
import Movies from './Movies.js';
import Profile from './Profile.js';
import Admin from './Admin.js';
import Settings from './Settings.js';
import Login from './Login.js';


const AppController = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/shows" element={<Shows />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
          
          {/* Default Route (catch-all) for undefined URLs */}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppController;
