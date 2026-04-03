import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ExternalLink, Play, DollarSign, Clock, Users, CheckCircle, XCircle, ArrowLeft, Share2 } from 'lucide-react';
import { useQuery } from 'react-query';
import { getToolById, updateToolRating } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const ToolDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userRating, setUserRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const { data: tool, isLoading, error } = useQuery(
    ['tool', id],
    () => getToolById(id),
    { enabled: !!id }
  );

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

  const handleRatingSubmit = async (rating) => {
    try {
      await updateToolRating(id, rating);
      setUserRating(rating);
      toast.success('Rating submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit rating');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: tool.name,
          text: tool.description,
          url: window.location.href,
        });
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  if (isLoading) {
    return <LoadingSpinner text="Loading tool details..." />;
  }

  if (error || !tool) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tool Not Found</h2>
          <p className="text-gray-600 mb-4">The tool you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/tools')}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
          >
            Browse All Tools
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tool Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm p-6 mb-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
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
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{tool.name}</h1>
                    <div className="flex items-center gap-4">
                      {tool.rating?.average > 0 && (
                        <div className="flex items-center gap-1">
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{tool.rating.average}</span>
                          <span className="text-gray-500">({tool.rating.count} reviews)</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-sm ${getDifficultyColor(tool.difficulty)}`}>
                          {tool.difficulty}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-sm ${getPricingColor(tool.pricing.type)}`}>
                          {formatPrice(tool.pricing)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleShare}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              <p className="text-gray-700 text-lg mb-4">{tool.description}</p>

              <div className="flex items-center gap-4">
                <a
                  href={tool.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                >
                  <ExternalLink className="w-4 h-4" />
                  Visit Website
                </a>
                {tool.videoTutorial && (
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors duration-200">
                    <Play className="w-4 h-4" />
                    Watch Tutorial
                  </button>
                )}
              </div>
            </motion.div>

            {/* Video Tutorial */}
            {tool.videoTutorial && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg shadow-sm p-6 mb-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Play className="w-5 h-5 text-secondary-600" />
                  Video Tutorial
                </h2>
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Video tutorial would be embedded here</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Duration: {tool.videoTutorial.duration}
                    </p>
                  </div>
                </div>
                {tool.videoTutorial.description && (
                  <p className="text-gray-700 mt-4">{tool.videoTutorial.description}</p>
                )}
              </motion.div>
            )}

            {/* Features */}
            {tool.features && tool.features.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg shadow-sm p-6 mb-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tool.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-900">{feature.name}</h3>
                        {feature.description && (
                          <p className="text-gray-600 text-sm">{feature.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Pros and Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {tool.pros && tool.pros.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-lg shadow-sm p-6"
                >
                  <h2 className="text-xl font-semibold text-green-700 mb-4">Pros</h2>
                  <ul className="space-y-2">
                    {tool.pros.map((pro, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {tool.cons && tool.cons.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-lg shadow-sm p-6"
                >
                  <h2 className="text-xl font-semibold text-red-700 mb-4">Cons</h2>
                  <ul className="space-y-2">
                    {tool.cons.map((con, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{con}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Pricing Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow-sm p-6 mb-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Pricing
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className={`px-2 py-1 rounded-full text-sm ${getPricingColor(tool.pricing.type)}`}>
                    {tool.pricing.type}
                  </span>
                </div>
                {tool.pricing.price?.amount && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-semibold">{formatPrice(tool.pricing)}</span>
                  </div>
                )}
                {tool.pricing.freeTrial?.available && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Free Trial:</span>
                    <span className="text-green-600">{tool.pricing.freeTrial.duration}</span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Platform Support */}
            {tool.platforms && tool.platforms.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg shadow-sm p-6 mb-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Platforms</h2>
                <div className="flex flex-wrap gap-2">
                  {tool.platforms.map((platform, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Rating */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow-sm p-6 mb-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Rate This Tool</h2>
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRatingSubmit(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="p-1"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= (hoveredRating || userRating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                {userRating > 0 ? 'Thank you for rating!' : 'Click to rate this tool'}
              </p>
            </motion.div>

            {/* Tags */}
            {tool.tags && tool.tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {tool.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolDetail;
