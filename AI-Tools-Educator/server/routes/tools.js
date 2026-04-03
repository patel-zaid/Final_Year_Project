const express = require('express');
const Tool = require('../models/Tool');
const router = express.Router();

// Get all tools with filtering and pagination
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      pricing,
      difficulty,
      search,
      sortBy = 'rating',
      sortOrder = 'desc'
    } = req.query;

    // Build filter criteria
    let filter = {};
    
    if (category) {
      filter.category = category;
    }
    
    if (pricing) {
      filter['pricing.type'] = pricing;
    }
    
    if (difficulty) {
      filter.difficulty = difficulty;
    }
    
    if (search) {
      filter.$text = { $search: search };
    }

    // Build sort criteria
    let sort = {};
    if (sortBy === 'rating') {
      sort['rating.average'] = sortOrder === 'desc' ? -1 : 1;
    } else if (sortBy === 'name') {
      sort.name = sortOrder === 'desc' ? -1 : 1;
    } else if (sortBy === 'price') {
      sort['pricing.price.amount'] = sortOrder === 'desc' ? -1 : 1;
    } else {
      sort.createdAt = sortOrder === 'desc' ? -1 : 1;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const tools = await Tool.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');

    const total = await Tool.countDocuments(filter);

    res.json({
      tools,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalTools: total,
        hasNext: skip + tools.length < total,
        hasPrev: parseInt(page) > 1
      }
    });

  } catch (error) {
    console.error('Get tools error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch tools',
      message: error.message 
    });
  }
});

// Get tool by ID
router.get('/:id', async (req, res) => {
  try {
    const tool = await Tool.findById(req.params.id);
    
    if (!tool) {
      return res.status(404).json({ error: 'Tool not found' });
    }

    res.json(tool);
  } catch (error) {
    console.error('Get tool error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch tool',
      message: error.message 
    });
  }
});

// Get tools by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const { limit = 10 } = req.query;

    const tools = await Tool.find({ category })
      .sort({ 'rating.average': -1 })
      .limit(parseInt(limit));

    res.json(tools);
  } catch (error) {
    console.error('Get tools by category error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch tools by category',
      message: error.message 
    });
  }
});

// Search tools
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const { limit = 10 } = req.query;

    const tools = await Tool.find(
      { $text: { $search: query } },
      { score: { $meta: 'textScore' } }
    )
    .sort({ score: { $meta: 'textScore' } })
    .limit(parseInt(limit));

    res.json(tools);
  } catch (error) {
    console.error('Search tools error:', error);
    res.status(500).json({ 
      error: 'Failed to search tools',
      message: error.message 
    });
  }
});

// Get popular tools
router.get('/popular/trending', async (req, res) => {
  try {
    const { limit = 8 } = req.query;

    const tools = await Tool.find()
      .sort({ 'rating.count': -1, 'rating.average': -1 })
      .limit(parseInt(limit));

    res.json(tools);
  } catch (error) {
    console.error('Get popular tools error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch popular tools',
      message: error.message 
    });
  }
});

// Get free tools
router.get('/pricing/free', async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const tools = await Tool.find({
      $or: [
        { 'pricing.type': 'free' },
        { 'pricing.type': 'freemium' }
      ]
    })
    .sort({ 'rating.average': -1 })
    .limit(parseInt(limit));

    res.json(tools);
  } catch (error) {
    console.error('Get free tools error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch free tools',
      message: error.message 
    });
  }
});

// Create new tool (admin only - for demo purposes)
router.post('/', async (req, res) => {
  try {
    const tool = new Tool(req.body);
    await tool.save();
    
    res.status(201).json(tool);
  } catch (error) {
    console.error('Create tool error:', error);
    res.status(500).json({ 
      error: 'Failed to create tool',
      message: error.message 
    });
  }
});

// Update tool rating
router.patch('/:id/rating', async (req, res) => {
  try {
    const { rating } = req.body;
    
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const tool = await Tool.findById(req.params.id);
    if (!tool) {
      return res.status(404).json({ error: 'Tool not found' });
    }

    // Update rating
    const newCount = tool.rating.count + 1;
    const newAverage = ((tool.rating.average * tool.rating.count) + rating) / newCount;

    tool.rating = {
      average: Math.round(newAverage * 10) / 10,
      count: newCount
    };

    await tool.save();

    res.json({ 
      message: 'Rating updated successfully',
      newRating: tool.rating 
    });
  } catch (error) {
    console.error('Update rating error:', error);
    res.status(500).json({ 
      error: 'Failed to update rating',
      message: error.message 
    });
  }
});

module.exports = router;
