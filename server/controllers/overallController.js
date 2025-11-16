import OverallModel from '../models/Overalls.js'; 

export const getOveralls = (req, res) => {
  OverallModel.find()
    .then((overalls) => res.json(overalls))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};
