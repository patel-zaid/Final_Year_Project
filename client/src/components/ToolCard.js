import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ExternalLink, Play, DollarSign, Clock } from 'lucide-react';

const ToolCard = ({ tool }) => {
  const formatPrice = (pricing) => {
    if (pricing.type === 'free') return 'Free';
    if (pricing.type === 'freemium') return 'Freemium';
    if (pricing.price?.amount) {
      const amount = pricing.price.amount;
      const currency = pricing.price.currency || 'USD';
      const period = pricing.price.period;
      return `$${amount}${period ? `/${period}` : ''}`;
    }
    return 'Paid';
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPricingColor = (type) => {
    switch (type) {
      case 'free': return 'bg-green-100 text-green-800';
      case 'freemium': return 'bg-blue-100 text-blue-800';
      case 'paid': return 'bg-purple-100 text-purple-800';
      case 'subscription': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    >
      <Link to={`/tools/${tool._id}`}>
        {/* Tool Image/Logo */}
        <div className="h-48 bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center relative overflow-hidden">
          {tool.logo ? (
            <img
              src={tool.logo}
              alt={tool.name}
              className="w-16 h-16 object-contain"
            />
          ) : (
            <div className="w-16 h-16 bg-primary-200 rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-primary-600">
                {tool.name.charAt(0)}
              </span>
            </div>
          )}
          
          {/* Video Tutorial Indicator */}
          {tool.videoTutorial && (
            <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs">
              <Play className="w-3 h-3" />
              Tutorial
            </div>
          )}
        </div>

        <div className="p-4">
          {/* Tool Name and Rating */}
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-900 text-lg line-clamp-1">
              {tool.name}
            </h3>
            {tool.rating?.average > 0 && (
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{tool.rating.average}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {tool.description}
          </p>

          {/* Category and Difficulty */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
              {tool.category.replace('-', ' ')}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(tool.difficulty)}`}>
              {tool.difficulty}
            </span>
          </div>

          {/* Pricing */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4 text-gray-500" />
              <span className={`text-xs px-2 py-1 rounded-full ${getPricingColor(tool.pricing.type)}`}>
                {formatPrice(tool.pricing)}
              </span>
            </div>
            {tool.videoTutorial?.duration && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>{tool.videoTutorial.duration}</span>
              </div>
            )}
          </div>

          {/* Features Preview */}
          {tool.features && tool.features.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-1">
                {tool.features.slice(0, 3).map((feature, index) => (
                  <span
                    key={index}
                    className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded"
                  >
                    {feature.name}
                  </span>
                ))}
                {tool.features.length > 3 && (
                  <span className="text-xs text-gray-500">
                    +{tool.features.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1">
              Learn More
              <ExternalLink className="w-3 h-3" />
            </button>
            {tool.videoTutorial && (
              <button className="text-secondary-600 hover:text-secondary-700 text-sm font-medium flex items-center gap-1">
                <Play className="w-3 h-3" />
                Watch
              </button>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ToolCard;


