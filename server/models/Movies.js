import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema(
  {},
  {
    strict: false,
    collection: 'movies',
  }
);

export default mongoose.model('Movies', movieSchema);
