const mongoose = require('mongoose');

const OverallSchema = new mongoose.Schema({
  description: { type: String, required: true },
  genre: { type: String, required: true },
  name: { type: String, required: true },
  url: { type: String, required: true }, 
});

const OverallModel = mongoose.model('overalls', OverallSchema); 

module.exports = OverallModel;
