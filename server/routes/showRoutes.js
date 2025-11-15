const express = require('express');
const router = express.Router();
const show = require('../models/Shows');

  router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const shows = await show.find({})
      .select('title year plot poster genres runtime') 
      .skip(skip)
      .limit(limit)
      .lean(); 
    const total = await show.countDocuments();

    res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: shows
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const show = await show.findById(req.params.id).lean();
    if (!show) return res.status(404).json({ message: 'Show not found' });
    res.json(show);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;