# AI Tools Educator (A Recommendation System)

A comprehensive web-based platform for discovering, comparing, and getting personalized recommendations for AI-powered software tools. Built with React, Node.js, Express, MongoDB, and OpenAI integration.

## 🚀 Features

- **AI-Powered Recommendations**: Get personalized tool suggestions using OpenAI GPT
- **Comprehensive Tool Database**: Detailed information about pricing, features, pros/cons
- **Video Tutorials**: Integrated video guides for each tool
- **Advanced Search & Filtering**: Find tools by category, pricing, difficulty level
- **Modern UI/UX**: Responsive design with smooth animations
- **Real-time Ratings**: Community-driven ratings and reviews
- **Category Organization**: Tools organized by purpose and functionality

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Query** - Data fetching and caching
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **OpenAI API** - AI-powered recommendations
- **JWT** - Authentication (optional)

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- OpenAI API key

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ai-tools-recommender
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install all dependencies (root, server, and client)
npm run install-all
```

### 3. Environment Setup

Create a `.env` file in the `server` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/ai-tools-recommender

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Cloudinary (for video/image storage)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# JWT Secret (if implementing authentication)
JWT_SECRET=your_jwt_secret_here
```

### 4. Database Setup

Make sure MongoDB is running, then seed the database with sample data:

```bash
cd server
node seed.js
```

### 5. Start the Application

#### Development Mode (Recommended)
```bash
# Start both server and client concurrently
npm run dev
```

#### Manual Start
```bash
# Terminal 1 - Start the server
cd server
npm run dev

# Terminal 2 - Start the client
cd client
npm start
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 🎯 Usage

### For Users
1. **Browse Tools**: Explore tools by category or search for specific needs
2. **AI Recommendations**: Use the AI search to get personalized suggestions
3. **Compare Tools**: View detailed information including pricing, features, and reviews
4. **Watch Tutorials**: Access video guides for each tool
5. **Rate Tools**: Help the community by rating tools you've used

### For Developers
1. **API Endpoints**: RESTful API for tool management
2. **AI Integration**: OpenAI-powered recommendation engine
3. **Database Models**: MongoDB schemas for tools and categories
4. **Frontend Components**: Reusable React components

## 📁 Project Structure

```
ai-tools-recommender/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── ...
│   └── package.json
├── server/                # Node.js backend
│   ├── config/           # Database configuration
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── seeders/          # Sample data
│   └── package.json
├── package.json          # Root package.json
└── README.md
```

## 🔧 API Endpoints

### Tools
- `GET /api/tools` - Get all tools with filtering
- `GET /api/tools/:id` - Get tool by ID
- `GET /api/tools/category/:category` - Get tools by category
- `GET /api/tools/search/:query` - Search tools
- `GET /api/tools/popular/trending` - Get popular tools
- `PATCH /api/tools/:id/rating` - Update tool rating

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:category` - Get category details

### AI
- `POST /api/ai/recommend` - Get AI recommendations
- `POST /api/ai/enhance-search` - Enhance search queries

## 🎨 Customization

### Adding New Tools
1. Use the admin interface (if implemented) or
2. Add directly to the database using the Tool model
3. Ensure all required fields are populated

### Styling
- Modify `client/tailwind.config.js` for theme customization
- Update `client/src/index.css` for global styles
- Component-specific styles use Tailwind classes

### AI Integration
- Modify `server/routes/ai.js` for custom AI logic
- Update prompts in the recommendation engine
- Add new AI-powered features

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy the build folder
```

### Backend (Heroku/Railway/DigitalOcean)
```bash
cd server
# Set environment variables
# Deploy the server directory
```

### Database
- Use MongoDB Atlas for cloud database
- Update `MONGODB_URI` in environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for the GPT API
- MongoDB for the database
- React and Node.js communities
- All the open-source libraries used in this project

## 📞 Support

If you have any questions or need help, please:
1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the development team

---

**Happy Tool Hunting! 🛠️✨**
