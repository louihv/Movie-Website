import 'dotenv/config'; 
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import overallRoutes from './routes/overallRoutes.js';
import seriesRoutes from './routes/seriesRoutes.js';
import tmdbRoutes from './routes/tmdbRoutes.js';

const app = express();

const allowedOrigins = ['http://localhost:3000'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 8005;

app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/series', seriesRoutes);
app.use('/api', overallRoutes);
app.use('/api/tmdb', tmdbRoutes);

app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Server error',
  });
});

app.get('/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Server startup failed:', err);
    process.exit(1);
  }
};

startServer();
