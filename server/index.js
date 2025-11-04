const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');
const overallRoutes = require('./routes/overallRoutes');


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/ShowsDB")
  .then(() => {
    console.log("MongoDB connected");
    app.use('/api', userRoutes);
    app.use('/api', movieRoutes);
    app.use('/api', overallRoutes);


    app.listen(8005, () => {
      console.log(`Server is up and running on port 8005`);
    });
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });