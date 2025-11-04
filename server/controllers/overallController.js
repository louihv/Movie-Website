const OverallModel = require('../models/Overalls'); // Ensure the filename is correct

// Get all users
const getOveralls = (req, res) => {
    OverallModel.find()
    .then((overalls) => res.json(overalls))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

module.exports = { getOveralls };
