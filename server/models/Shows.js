const mongoose = require('mongoose');

const showSchema = new mongoose.Schema(
  {}, 
  { strict: false});

module.exports = mongoose.model('Shows', showSchema);