import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search as SearchIcon, Sparkles, Filter, ArrowRight, Star, ExternalLink } from 'lucide-react';
import { useQuery } from 'react-query';
import { getAIRecommendations, enhanceSearch, searchTools } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ToolCard from '../components/ToolCard';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [isAISearch, setIsAISearch] = useState(searchParams.get('ai') === 'true');
  const [preferences, setPreferences] = useState({
    budget: '',
    experience: '',
    platform: ''
  });

  // Enhanced search suggestions
  const { data: enhancedSearch, isLoading: enhancingSearch } = useQuery(
    ['enhanceSearch', query],
    () => enhanceSearch(query),
    { enabled: !!query && query.length > 3 }
  );

  // AI Recommendations
  const { data: aiRecommendations, isLoading: aiLoading, error: aiError } = useQuery(
    ['aiRecommendations', query, preferences],
    () => getAIRecommendations(query, null, preferences),
    { enabled: !!query && isAISearch }
  );

  // Regular search results
  const { data: searchResults, isLoading: searchLoading } = useQuery(
    ['searchResults', query],
    () => searchTools(query),
    { enabled: !!query && !isAISearch }
  );

  useEffect(() => {
    const newParams = new URLSearchParams();
    if (query) newParams.set('q', query);
    if (isAISearch) newParams.set('ai', 'true');
    setSearchParams(newParams);
  }, [query, isAISearch, setSearchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      // Trigger search
    }
  };

  const handleAISearch = () => {
    setIsAISearch(true);
  };

  const handleRegularSearch = () => {
    setIsAISearch(false);
  };

  const isLoading = aiLoading || searchLoading;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Search Tools</h1>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-2xl">
            <div className="flex gap-4 mb-4">
              <div className="flex-1 relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="What tools do you need? (e.g., video editing, data analysis)"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 font-semibold"
              >
                Search
              </button>
            </div>

            {/* Search Type Toggle */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleRegularSearch}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  !isAISearch
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <SearchIcon className="w-4 h-4 inline mr-2" />
                Regular Search
              </button>
              <button
                type="button"
                onClick={handleAISearch}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  isAISearch
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <Sparkles className="w-4 h-4 inline mr-2" />
                AI Recommendations
              </button>
            </div>
          </form>

          {/* Enhanced Search Suggestions */}
          {enhancedSearch && query && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-blue-50 rounded-lg"
            >
              <h3 className="font-semibold text-blue-900 mb-2">Search Suggestions:</h3>
              <div className="flex flex-wrap gap-2">
                {enhancedSearch.suggestions?.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setQuery(suggestion)}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors duration-200"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* AI Preferences */}
        {isAISearch && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm p-6 mb-8"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Filter className="w-5 h-5" />
              AI Preferences
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget
                </label>
                <select
                  value={preferences.budget}
                  onChange={(e) => setPreferences(prev => ({ ...prev, budget: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Any Budget</option>
                  <option value="free">Free Only</option>
                  <option value="low">Under $10/month</option>
                  <option value="medium">$10-50/month</option>
                  <option value="high">$50+/month</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Level
                </label>
                <select
                  value={preferences.experience}
                  onChange={(e) => setPreferences(prev => ({ ...prev, experience: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Any Level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Platform
                </label>
                <select
                  value={preferences.platform}
                  onChange={(e) => setPreferences(prev => ({ ...prev, platform: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Any Platform</option>
                  <option value="web">Web</option>
                  <option value="windows">Windows</option>
                  <option value="mac">Mac</option>
                  <option value="linux">Linux</option>
                  <option value="mobile">Mobile</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}

        {/* Results */}
        {query && (
          <div>
            {isLoading ? (
              <LoadingSpinner text={isAISearch ? "Getting AI recommendations..." : "Searching tools..."} />
            ) : (
              <>
                {isAISearch ? (
                  /* AI Recommendations */
                  <div>
                    {aiError ? (
                      <div className="text-center py-12">
                        <div className="text-6xl mb-4">🤖</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Search Unavailable</h3>
                        <p className="text-gray-600 mb-4">
                          We're having trouble with our AI recommendations. Try regular search instead.
                        </p>
                        <button
                          onClick={handleRegularSearch}
                          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                        >
                          Use Regular Search
                        </button>
                      </div>
                    ) : aiRecommendations?.recommendations ? (
                      <div>
                        <div className="mb-6">
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            AI Recommendations for "{query}"
                          </h2>
                          <p className="text-gray-600">
                            Personalized recommendations based on your query and preferences
                          </p>
                        </div>

                        {/* AI Summary */}
                        {aiRecommendations.recommendations.summary && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-6 mb-8"
                          >
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                              <Sparkles className="w-5 h-5 text-primary-600" />
                              AI Summary
                            </h3>
                            <p className="text-gray-700">{aiRecommendations.recommendations.summary}</p>
                          </motion.div>
                        )}

                        {/* Recommendations */}
                        <div className="space-y-6">
                          {aiRecommendations.recommendations.recommendations?.map((rec, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="bg-white rounded-lg shadow-sm p-6"
                            >
                              <div className="flex items-start justify-between mb-4">
                                <h3 className="text-xl font-semibold text-gray-900">
                                  {rec.toolName}
                                </h3>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                    {rec.difficulty}
                                  </span>
                                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                    {rec.pricing}
                                  </span>
                                </div>
                              </div>

                              <p className="text-gray-700 mb-4">{rec.reason}</p>
                              
                              <div className="mb-4">
                                <h4 className="font-semibold text-gray-900 mb-2">Best for:</h4>
                                <p className="text-gray-600">{rec.bestFor}</p>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-semibold text-green-700 mb-2">Pros:</h4>
                                  <ul className="text-sm text-gray-600 space-y-1">
                                    {rec.pros?.map((pro, i) => (
                                      <li key={i} className="flex items-center gap-2">
                                        <span className="text-green-500">✓</span>
                                        {pro}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-red-700 mb-2">Cons:</h4>
                                  <ul className="text-sm text-gray-600 space-y-1">
                                    {rec.cons?.map((con, i) => (
                                      <li key={i} className="flex items-center gap-2">
                                        <span className="text-red-500">✗</span>
                                        {con}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        {/* Comparison */}
                        {aiRecommendations.recommendations.comparison && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-white rounded-lg shadow-sm p-6 mt-8"
                          >
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Comparison</h3>
                            <p className="text-gray-700">{aiRecommendations.recommendations.comparison}</p>
                          </motion.div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="text-6xl mb-4">🤖</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No AI Recommendations</h3>
                        <p className="text-gray-600">
                          Try a different search term or adjust your preferences.
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Regular Search Results */
                  <div>
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Search Results for "{query}"
                      </h2>
                      <p className="text-gray-600">
                        Found {searchResults?.length || 0} tools matching your search
                      </p>
                    </div>

                    {searchResults?.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {searchResults.map((tool, index) => (
                          <motion.div
                            key={tool._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <ToolCard tool={tool} />
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No tools found</h3>
                        <p className="text-gray-600 mb-4">
                          Try a different search term or use AI recommendations for better results.
                        </p>
                        <button
                          onClick={handleAISearch}
                          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center gap-2 mx-auto"
                        >
                          <Sparkles className="w-4 h-4" />
                          Try AI Search
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* No Query State */}
        {!query && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Your Search</h3>
            <p className="text-gray-600 mb-6">
              Enter a search term above to find the perfect tools for your needs
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {['video editing', 'data analysis', 'image editing', 'web development', 'AI tools'].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;


