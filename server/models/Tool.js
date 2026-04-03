const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      'video-editing',
      'image-editing',
      'audio-editing',
      'web-development',
      'data-analysis',
      'ai-ml',
      'productivity',
      'design',
      'writing',
      'marketing',
      'other'
    ]
  },
  subcategory: {
    type: String,
    trim: true
  },
  pricing: {
    type: {
      type: String,
      enum: ['free', 'freemium', 'paid', 'subscription'],
      required: true
    },
    price: {
      amount: Number,
      currency: {
        type: String,
        default: 'USD'
      },
      period: {
        type: String,
        enum: ['one-time', 'monthly', 'yearly', 'lifetime']
      }
    },
    freeTrial: {
      available: Boolean,
      duration: String
    }
  },
  features: [{
    name: String,
    description: String,
    isHighlight: Boolean
  }],
  pros: [String],
  cons: [String],
  website: {
    type: String,
    required: true
  },
  logo: String,
  screenshots: [String],
  videoTutorial: {
    title: String,
    url: String,
    duration: String,
    description: String
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  platforms: [{
    type: String,
    enum: ['web', 'windows', 'mac', 'linux', 'ios', 'android']
  }],
  tags: [String],
  rating: {
    average: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  },
  aiGenerated: {
    type: Boolean,
    default: false
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for search functionality
toolSchema.index({ name: 'text', description: 'text', tags: 'text' });
toolSchema.index({ category: 1 });
toolSchema.index({ 'pricing.type': 1 });

module.exports = mongoose.model('Tool', toolSchema);


