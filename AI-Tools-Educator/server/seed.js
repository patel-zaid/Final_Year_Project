require('dotenv').config();
const mongoose = require('mongoose');
const { seedDatabase } = require('./seeders/sampleData');

// Connect to database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-tools-recommender', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('📦 Connected to MongoDB');
  return seedDatabase();
})
.catch((error) => {
  console.error('❌ Database connection error:', error);
  process.exit(1);
});
