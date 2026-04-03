const Tool = require('../models/Tool');

const sampleTools = [
  {
    name: "Adobe Premiere Pro",
    description: "Professional video editing software with advanced features for filmmakers and content creators.",
    category: "video-editing",
    subcategory: "professional",
    pricing: {
      type: "subscription",
      price: {
        amount: 22.99,
        currency: "USD",
        period: "monthly"
      },
      freeTrial: {
        available: true,
        duration: "7 days"
      }
    },
    features: [
      { name: "Multi-camera editing", description: "Edit footage from multiple cameras simultaneously", isHighlight: true },
      { name: "Color correction", description: "Professional color grading tools", isHighlight: true },
      { name: "Audio mixing", description: "Advanced audio editing capabilities", isHighlight: false },
      { name: "Motion graphics", description: "Built-in motion graphics templates", isHighlight: false },
      { name: "Cloud collaboration", description: "Work with team members in real-time", isHighlight: true }
    ],
    pros: [
      "Industry standard for professional video editing",
      "Extensive plugin ecosystem",
      "Excellent color correction tools",
      "Strong integration with other Adobe products"
    ],
    cons: [
      "Expensive subscription model",
      "Steep learning curve for beginners",
      "Resource-intensive software"
    ],
    website: "https://www.adobe.com/products/premiere.html",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Adobe_Premiere_Pro_CC_icon.svg/512px-Adobe_Premiere_Pro_CC_icon.svg.png",
    videoTutorial: {
      title: "Premiere Pro Beginner's Guide",
      url: "https://youtube.com/watch?v=example1",
      duration: "45 minutes",
      description: "Complete beginner's tutorial covering all essential features"
    },
    difficulty: "intermediate",
    platforms: ["windows", "mac"],
    tags: ["video", "editing", "professional", "adobe"],
    rating: {
      average: 4.5,
      count: 1250
    }
  },
  {
    name: "DaVinci Resolve",
    description: "Professional video editing and color correction software with a free version available.",
    category: "video-editing",
    subcategory: "professional",
    pricing: {
      type: "freemium",
      price: {
        amount: 295,
        currency: "USD",
        period: "one-time"
      },
      freeTrial: {
        available: true,
        duration: "Full free version available"
      }
    },
    features: [
      { name: "Color correction", description: "Industry-leading color grading", isHighlight: true },
      { name: "Video editing", description: "Professional editing timeline", isHighlight: true },
      { name: "Audio post-production", description: "Fairlight audio tools", isHighlight: true },
      { name: "Visual effects", description: "Fusion VFX compositing", isHighlight: false }
    ],
    pros: [
      "Completely free version available",
      "Professional-grade color correction",
      "All-in-one post-production suite",
      "Regular updates and improvements"
    ],
    cons: [
      "Steep learning curve",
      "Requires powerful hardware",
      "Free version has some limitations"
    ],
    website: "https://www.blackmagicdesign.com/products/davinciresolve",
    videoTutorial: {
      title: "DaVinci Resolve Complete Course",
      url: "https://youtube.com/watch?v=example2",
      duration: "2 hours",
      description: "Comprehensive course from beginner to advanced"
    },
    difficulty: "advanced",
    platforms: ["windows", "mac", "linux"],
    tags: ["video", "editing", "color", "free"],
    rating: {
      average: 4.7,
      count: 890
    }
  },
  {
    name: "Canva",
    description: "User-friendly graphic design platform with templates for social media, presentations, and more.",
    category: "design",
    subcategory: "graphic-design",
    pricing: {
      type: "freemium",
      price: {
        amount: 12.99,
        currency: "USD",
        period: "monthly"
      },
      freeTrial: {
        available: true,
        duration: "Free plan available"
      }
    },
    features: [
      { name: "Templates", description: "Thousands of pre-made templates", isHighlight: true },
      { name: "Brand kit", description: "Consistent branding tools", isHighlight: true },
      { name: "Collaboration", description: "Team collaboration features", isHighlight: false },
      { name: "Stock photos", description: "Access to stock photography", isHighlight: false }
    ],
    pros: [
      "Very easy to use",
      "Extensive template library",
      "Good free plan",
      "Great for non-designers"
    ],
    cons: [
      "Limited advanced features",
      "Some templates require premium",
      "Less control than professional tools"
    ],
    website: "https://www.canva.com",
    videoTutorial: {
      title: "Canva Tutorial for Beginners",
      url: "https://youtube.com/watch?v=example3",
      duration: "20 minutes",
      description: "Quick start guide to using Canva effectively"
    },
    difficulty: "beginner",
    platforms: ["web", "ios", "android"],
    tags: ["design", "templates", "social-media", "easy"],
    rating: {
      average: 4.3,
      count: 2100
    }
  },
  {
    name: "Figma",
    description: "Collaborative interface design tool for creating user interfaces and prototypes.",
    category: "design",
    subcategory: "ui-ux",
    pricing: {
      type: "freemium",
      price: {
        amount: 12,
        currency: "USD",
        period: "monthly"
      },
      freeTrial: {
        available: true,
        duration: "Free plan available"
      }
    },
    features: [
      { name: "Real-time collaboration", description: "Work together in real-time", isHighlight: true },
      { name: "Prototyping", description: "Interactive prototypes", isHighlight: true },
      { name: "Design systems", description: "Component libraries", isHighlight: true },
      { name: "Developer handoff", description: "Easy code generation", isHighlight: false }
    ],
    pros: [
      "Excellent collaboration features",
      "Powerful prototyping tools",
      "Great for teams",
      "Strong community and plugins"
    ],
    cons: [
      "Requires internet connection",
      "Can be slow with large files",
      "Learning curve for complex features"
    ],
    website: "https://www.figma.com",
    videoTutorial: {
      title: "Figma UI Design Tutorial",
      url: "https://youtube.com/watch?v=example4",
      duration: "1 hour",
      description: "Complete UI design workflow in Figma"
    },
    difficulty: "intermediate",
    platforms: ["web", "windows", "mac"],
    tags: ["ui", "ux", "design", "collaboration"],
    rating: {
      average: 4.6,
      count: 1800
    }
  },
  {
    name: "ChatGPT",
    description: "Advanced AI language model for conversation, writing assistance, and problem-solving.",
    category: "ai-ml",
    subcategory: "language-model",
    pricing: {
      type: "freemium",
      price: {
        amount: 20,
        currency: "USD",
        period: "monthly"
      },
      freeTrial: {
        available: true,
        duration: "Free tier available"
      }
    },
    features: [
      { name: "Natural conversation", description: "Human-like dialogue", isHighlight: true },
      { name: "Code generation", description: "Programming assistance", isHighlight: true },
      { name: "Creative writing", description: "Content creation help", isHighlight: true },
      { name: "Problem solving", description: "Analytical thinking", isHighlight: false }
    ],
    pros: [
      "Very versatile and helpful",
      "Good free tier",
      "Constantly improving",
      "Easy to use interface"
    ],
    cons: [
      "Can make mistakes",
      "Limited knowledge cutoff",
      "Requires internet connection"
    ],
    website: "https://chat.openai.com",
    videoTutorial: {
      title: "ChatGPT Masterclass",
      url: "https://youtube.com/watch?v=example5",
      duration: "30 minutes",
      description: "Learn to use ChatGPT effectively for various tasks"
    },
    difficulty: "beginner",
    platforms: ["web", "ios", "android"],
    tags: ["ai", "chatbot", "writing", "assistant"],
    rating: {
      average: 4.4,
      count: 3500
    }
  },
  {
    name: "Notion",
    description: "All-in-one workspace for notes, docs, wikis, and project management.",
    category: "productivity",
    subcategory: "note-taking",
    pricing: {
      type: "freemium",
      price: {
        amount: 8,
        currency: "USD",
        period: "monthly"
      },
      freeTrial: {
        available: true,
        duration: "Free plan available"
      }
    },
    features: [
      { name: "Note-taking", description: "Rich text and media notes", isHighlight: true },
      { name: "Database", description: "Structured data management", isHighlight: true },
      { name: "Templates", description: "Pre-built page templates", isHighlight: false },
      { name: "Collaboration", description: "Team workspace features", isHighlight: true }
    ],
    pros: [
      "Very flexible and customizable",
      "Great for organization",
      "Good free plan",
      "Strong community templates"
    ],
    cons: [
      "Can be overwhelming for beginners",
      "Mobile app could be better",
      "Learning curve for advanced features"
    ],
    website: "https://www.notion.so",
    videoTutorial: {
      title: "Notion Beginner's Guide",
      url: "https://youtube.com/watch?v=example6",
      duration: "25 minutes",
      description: "Complete setup and organization tutorial"
    },
    difficulty: "intermediate",
    platforms: ["web", "windows", "mac", "ios", "android"],
    tags: ["productivity", "notes", "organization", "collaboration"],
    rating: {
      average: 4.5,
      count: 2200
    }
  },
  {
    name: "Tableau",
    description: "Powerful data visualization and business intelligence platform.",
    category: "data-analysis",
    subcategory: "visualization",
    pricing: {
      type: "subscription",
      price: {
        amount: 70,
        currency: "USD",
        period: "monthly"
      },
      freeTrial: {
        available: true,
        duration: "14 days"
      }
    },
    features: [
      { name: "Data visualization", description: "Interactive charts and dashboards", isHighlight: true },
      { name: "Data connection", description: "Connect to various data sources", isHighlight: true },
      { name: "Sharing", description: "Publish and share insights", isHighlight: false },
      { name: "Mobile access", description: "View dashboards on mobile", isHighlight: false }
    ],
    pros: [
      "Industry-leading visualization",
      "Powerful data analysis",
      "Great for business intelligence",
      "Strong community support"
    ],
    cons: [
      "Expensive for individuals",
      "Steep learning curve",
      "Requires data knowledge"
    ],
    website: "https://www.tableau.com",
    videoTutorial: {
      title: "Tableau Fundamentals",
      url: "https://youtube.com/watch?v=example7",
      duration: "1.5 hours",
      description: "Learn the basics of data visualization in Tableau"
    },
    difficulty: "advanced",
    platforms: ["windows", "mac", "web"],
    tags: ["data", "visualization", "business", "analytics"],
    rating: {
      average: 4.2,
      count: 950
    }
  },
  {
    name: "VS Code",
    description: "Free, open-source code editor with extensive extension ecosystem.",
    category: "web-development",
    subcategory: "code-editor",
    pricing: {
      type: "free"
    },
    features: [
      { name: "Extensions", description: "Huge marketplace of extensions", isHighlight: true },
      { name: "IntelliSense", description: "Smart code completion", isHighlight: true },
      { name: "Debugging", description: "Built-in debugging tools", isHighlight: true },
      { name: "Git integration", description: "Version control support", isHighlight: false }
    ],
    pros: [
      "Completely free",
      "Lightweight and fast",
      "Extensive customization",
      "Great community support"
    ],
    cons: [
      "Can be overwhelming with many extensions",
      "Some features require setup",
      "Not as feature-rich as full IDEs"
    ],
    website: "https://code.visualstudio.com",
    videoTutorial: {
      title: "VS Code Setup and Tips",
      url: "https://youtube.com/watch?v=example8",
      duration: "35 minutes",
      description: "Essential extensions and configuration tips"
    },
    difficulty: "beginner",
    platforms: ["windows", "mac", "linux"],
    tags: ["code", "editor", "free", "extensions"],
    rating: {
      average: 4.8,
      count: 4500
    }
  }
];

const seedDatabase = async () => {
  try {
    console.log('🌱 Seeding database with sample tools...');
    
    // Clear existing tools
    await Tool.deleteMany({});
    console.log('✅ Cleared existing tools');
    
    // Insert sample tools
    const insertedTools = await Tool.insertMany(sampleTools);
    console.log(`✅ Inserted ${insertedTools.length} sample tools`);
    
    console.log('🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

module.exports = { seedDatabase, sampleTools };
