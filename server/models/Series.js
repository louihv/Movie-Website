import mongoose from 'mongoose';

const seriesSchema = new mongoose.Schema(
  {},
  { 
    strict: false,
    collection: 'shows'
   }
);

export default mongoose.model('Shows', seriesSchema);
