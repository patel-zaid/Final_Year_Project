import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const CategoryCard = ({ category }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    >
      <Link to={`/categories/${category.id}`}>
        <div className="p-6">
          {/* Category Icon */}
          <div className="text-4xl mb-4">
            {category.icon}
          </div>

          {/* Category Name */}
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {category.name}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {category.description}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-500">
              {category.count} tools
            </div>
            {category.avgRating > 0 && (
              <div className="text-sm text-gray-500">
                ⭐ {category.avgRating}
              </div>
            )}
          </div>

          {/* View Category Button */}
          <div className="flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm">
            <span>Explore tools</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;


