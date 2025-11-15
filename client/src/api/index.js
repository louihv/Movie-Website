const API_URL = 'http://localhost:8005/api';

export const api = {
  async getMovies() {
    const res = await fetch(`${API_URL}/movies`);
    if (!res.ok) throw new Error('Failed to fetch movies');
    return res.json();
  },

  async addMovie(data) {
    const res = await fetch(`${API_URL}/movies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to add movie');
    return res.json();
  },

  async updateMovie(id, data) {
    const res = await fetch(`${API_URL}/movies/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update');
    return res.json();
  },

  async deleteMovie(id) {
    const res = await fetch(`${API_URL}/movies/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete');
    return res.json();
  },
};