import mongoose from 'mongoose';

const showSchema = new mongoose.Schema(
  {},
  { strict: false }
);

export default mongoose.model('Shows', showSchema);
