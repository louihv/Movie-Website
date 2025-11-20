import mongoose from 'mongoose';

const showSchema = new mongoose.Schema(
  {},
  { strict: false,
    collection: 'shows'
   }
);

export default mongoose.model('Shows', showSchema);
