const express = require('express');
const Tool = require('../models/Tool');
const router = express.Router();

// Get all categories with tool counts
router.get('/', async (req, res) => {
  try {
    const categories = await Tool.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          avgRating: { $avg: '$rating.average' }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    const categoryInfo = {
      'video-editing': {
        name: 'Video Editing',
        description: 'Tools for creating and editing videos',
        icon: '🎬'
      },
      'image-editing': {
        name: 'Image Editing',
        description: 'Tools for photo and image manipulation',
        icon: '🖼️'
      },
      'audio-editing': {
        name: 'Audio Editing',
        description: 'Tools for audio production and editing',
        icon: '🎵'
      },
      'web-development': {
        name: 'Web Development',
        description: 'Tools for building websites and web applications',
        icon: '💻'
      },
      'data-analysis': {
        name: 'Data Analysis',
        description: 'Tools for analyzing and visualizing data',
        icon: '📊'
      },
      'ai-ml': {
        name: 'AI & Machine Learning',
        description: 'Artificial intelligence and ML tools',
        icon: '🤖'
      },
      'productivity': {
        name: 'Productivity',
        description: 'Tools to boost your productivity',
        icon: '⚡'
      },
      'design': {
        name: 'Design',
        description: 'Graphic design and UI/UX tools',
        icon: '🎨'
      },
      'writing': {
        name: 'Writing',
        description: 'Tools for content creation and writing',
        icon: '✍️'
      },
      'marketing': {
        name: 'Marketing',
        description: 'Digital marketing and social media tools',
        icon: '📈'
      },
      'other': {
        name: 'Other',
        description: 'Miscellaneous tools and utilities',
        icon: '🔧'
      }
    };

    const enrichedCategories = categories.map(cat => ({
      id: cat._id,
      ...categoryInfo[cat._id],
      count: cat.count,
      avgRating: Math.round(cat.avgRating * 10) / 10
    }));

    res.json(enrichedCategories);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch categories',
      message: error.message 
    });
  }
});

// Get category details
router.get('/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const { limit = 10 } = req.query;

    const tools = await Tool.find({ category })
      .sort({ 'rating.average': -1 })
      .limit(parseInt(limit));

    const categoryStats = await Tool.aggregate([
      { $match: { category } },
      {
        $group: {
          _id: null,
          totalTools: { $sum: 1 },
          avgRating: { $avg: '$rating.average' },
          pricingTypes: { $addToSet: '$pricing.type' },
          difficulties: { $addToSet: '$difficulty' }
        }
      }
    ]);

    res.json({
      category,
      tools,
      stats: categoryStats[0] || {
        totalTools: 0,
        avgRating: 0,
        pricingTypes: [],
        difficulties: []
      }
    });
  } catch (error) {
    console.error('Get category details error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch category details',
      message: error.message 
    });
  }
});

module.exports = router;


