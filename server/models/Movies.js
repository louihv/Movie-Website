const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({},
{
    strict: false,
    collection: 'movies'
});

module.exports = mongoose.model('Movies', movieSchema);