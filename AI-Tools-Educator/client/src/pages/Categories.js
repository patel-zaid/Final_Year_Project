import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { useQuery } from 'react-query';
import { getCategories } from '../services/api';
import CategoryCard from '../components/CategoryCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Categories = () => {
  const navigate = useNavigate();

  const { data: categories, isLoading, error } = useQuery(
    'categories',
    getCategories,
    { staleTime: 10 * 60 * 1000 }
  );

  if (isLoading) {
    return <LoadingSpinner text="Loading categories..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Categories</h2>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Browse by Category
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover tools organized by their purpose and functionality. 
            Find exactly what you need for your projects.
          </p>
        </motion.div>

        {/* Categories Grid */}
        {categories && categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CategoryCard category={category} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📂</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Categories Found</h3>
            <p className="text-gray-600">
              Categories are being loaded. Please check back later.
            </p>
          </div>
        )}

        {/* Popular Categories Section */}
        {categories && categories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
                <TrendingUp className="w-8 h-8 text-primary-600" />
                Popular Categories
              </h2>
              <p className="text-gray-600">
                Most searched and used categories by our community
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories
                .sort((a, b) => b.count - a.count)
                .slice(0, 6)
                .map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-3xl">{category.icon}</div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary-600">
                          {category.count}
                        </div>
                        <div className="text-sm text-gray-500">tools</div>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {category.name}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {category.description}
                    </p>

                    <button
                      onClick={() => navigate(`/categories/${category.id}`)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                    >
                      <span>Explore Tools</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Use our AI-powered search to get personalized recommendations 
              based on your specific needs and requirements.
            </p>
            <button
              onClick={() => navigate('/search')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 font-semibold"
            >
              <span>Try AI Search</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Categories;
