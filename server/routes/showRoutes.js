import express from 'express';
import Movie from '../models/Shows.js';  // Make sure this model exists!

const router = express.Router();

// GET all shows (you can use same movies collection or create new)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const shows = await Movie.find({})
      .select('title year plot poster genres')
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Movie.countDocuments();

    res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: shows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Optional: Get single show by ID
router.get('/:id', async (req, res) => {
  try {
    const show = await Movie.findById(req.params.id).lean();
    if (!show) return res.status(404).json({ message: 'Show not found' });
    res.json(show);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;