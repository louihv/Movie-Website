import express from 'express';
import Show from '../models/Shows.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const shows = await Show.find({})
      .select('title year plot poster genres runtime')
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Show.countDocuments();

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

router.get('/:id', async (req, res) => {
  try {
    const showItem = await Show.findById(req.params.id).lean();
    if (!showItem) return res.status(404).json({ message: 'Show not found' });
    res.json(showItem);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 
