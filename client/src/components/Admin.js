import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './css/Admin.module.css';

const API = 'http://localhost:8005/api';

const Admin = () => {
  // === USERS ===
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', age: '', email: '' });
  const [editUser, setEditUser] = useState(null);

  // === MOVIES ===
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({ title: '', year: '', genre: '', rating: '', poster: '' });
  const [editMovie, setEditMovie] = useState(null);

  // Fetch both
  useEffect(() => {
    fetchUsers();
    fetchMovies();
  }, []);

  // --- USERS ---
  const fetchUsers = () => axios.get(`${API}/getUsers`).then(res => setUsers(res.data)).catch(console.error);
  const createUser = () => axios.post(`${API}/createUser`, newUser).then(() => { fetchUsers(); setNewUser({ name: '', age: '', email: '' }); });
  const updateUser = () => axios.put(`${API}/updateUser/${editUser._id}`, editUser).then(() => { fetchUsers(); setEditUser(null); });
  const deleteUser = (id) => axios.delete(`${API}/deleteUser/${id}`).then(fetchUsers);

  // --- MOVIES ---
  const fetchMovies = () => axios.get(`${API}/movies`).then(res => setMovies(res.data)).catch(console.error);
  const createMovie = () => {
    const payload = {
      ...newMovie,
      year: Number(newMovie.year),
      rating: newMovie.rating ? Number(newMovie.rating) : undefined,
      genre: newMovie.genre.split(',').map(g => g.trim()).filter(Boolean),
    };
    axios.post(`${API}/movies`, payload).then(() => {
      fetchMovies();
      setNewMovie({ title: '', year: '', genre: '', rating: '', poster: '' });
    });
  };

  const updateMovie = () => {
    const payload = {
      ...editMovie,
      year: Number(editMovie.year),
      rating: editMovie.rating ? Number(editMovie.rating) : undefined,
      genre: editMovie.genre.split(',').map(g => g.trim()).filter(Boolean),
    };
    axios.put(`${API}/movies/${editMovie._id}`, payload).then(() => {
      fetchMovies();
      setEditMovie(null);
    });
  };

  const deleteMovie = (id) => axios.delete(`${API}/movies/${id}`).then(fetchMovies);

  return (
    <div className={styles.Admin}>
      {/* ===== USER SECTION ===== */}
      <section style={{ marginBottom: '3rem' }}>
        <h1>User Management</h1>

        <ul>
          {users.map(u => (
            <li key={u._id} style={{ margin: '0.5rem 0', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span>{u.name} - {u.age} - {u.email}</span>
              <button onClick={() => setEditUser(u)} className={styles.btnEdit}>Edit</button>
              <button onClick={() => deleteUser(u._id)} className={styles.btnDelete}>Delete</button>
            </li>
          ))}
        </ul>

        <h2>{editUser ? 'Edit User' : 'Create User'}</h2>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <input placeholder="Name" value={editUser?.name ?? newUser.name} onChange={e => editUser ? setEditUser({ ...editUser, name: e.target.value }) : setNewUser({ ...newUser, name: e.target.value })} />
          <input type="number" placeholder="Age" value={editUser?.age ?? newUser.age} onChange={e => editUser ? setEditUser({ ...editUser, age: e.target.value }) : setNewUser({ ...newUser, age: e.target.value })} />
          <input type="email" placeholder="Email" value={editUser?.email ?? newUser.email} onChange={e => editUser ? setEditUser({ ...editUser, email: e.target.value }) : setNewUser({ ...newUser, email: e.target.value })} />
          <button onClick={editUser ? updateUser : createUser}>{editUser ? 'Update' : 'Create'}</button>
          {editUser && <button onClick={() => setEditUser(null)}>Cancel</button>}
        </div>
      </section>

      <hr />

      {/* ===== MOVIE SECTION ===== */}
      <section>
        <h1>Movie Management</h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {movies.map(m => (
            <div key={m._id} style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
              {m.poster && <img src={m.poster} alt={m.title} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }} />}
              <h3>{m.title} ({m.year})</h3>
              <p><strong>Genre:</strong> {m.genre?.join(', ')}</p>
              <p><strong>Rating:</strong> {m.rating ?? '—'}</p>
              <div style={{ marginTop: '0.5rem' }}>
                <button onClick={() => setEditMovie(m)} className={styles.btnEdit}>Edit</button>
                <button onClick={() => deleteMovie(m._id)} className={styles.btnDelete}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        <h2>{editMovie ? 'Edit Movie' : 'Add New Movie'}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '500px' }}>
          <input placeholder="Title" value={editMovie?.title ?? newMovie.title} onChange={e => editMovie ? setEditMovie({ ...editMovie, title: e.target.value }) : setNewMovie({ ...newMovie, title: e.target.value })} />
          <input type="number" placeholder="Year" value={editMovie?.year ?? newMovie.year} onChange={e => editMovie ? setEditMovie({ ...editMovie, year: e.target.value }) : setNewMovie({ ...newMovie, year: e.target.value })} />
          <input placeholder="Genre (comma separated)" value={editMovie?.genre?.join(', ') ?? newMovie.genre} onChange={e => editMovie ? setEditMovie({ ...editMovie, genre: e.target.value }) : setNewMovie({ ...newMovie, genre: e.target.value })} />
          <input type="number" step="0.1" min="0" max="10" placeholder="Rating (0-10)" value={editMovie?.rating ?? newMovie.rating} onChange={e => editMovie ? setEditMovie({ ...editMovie, rating: e.target.value }) : setNewMovie({ ...newMovie, rating: e.target.value })} />
          <input placeholder="Poster URL" value={editMovie?.poster ?? newMovie.poster} onChange={e => editMovie ? setEditMovie({ ...editMovie, poster: e.target.value }) : setNewMovie({ ...newMovie, poster: e.target.value })} />
          <div>
            <button onClick={editMovie ? updateMovie : createMovie}>{editMovie ? 'Update' : 'Add'} Movie</button>
            {editMovie && <button onClick={() => setEditMovie(null)}>Cancel</button>}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admin;