const express = require('express');
const OpenAI = require('openai');
const Tool = require('../models/Tool');
const router = express.Router();

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// AI-powered tool recommendation
router.post('/recommend', async (req, res) => {
  try {
    const { query, category, preferences } = req.body;

    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    // Build search criteria
    let searchCriteria = {};
    if (category) {
      searchCriteria.category = category;
    }

    // Search for relevant tools in database
    const tools = await Tool.find(searchCriteria)
      .limit(20)
      .sort({ rating: -1 });

    if (tools.length === 0) {
      return res.status(404).json({ 
        error: 'No tools found',
        message: 'Try a different search term or category'
      });
    }

    // Create context for AI
    const toolsContext = tools.map(tool => ({
      name: tool.name,
      description: tool.description,
      category: tool.category,
      pricing: tool.pricing,
      features: tool.features.slice(0, 5), // Top 5 features
      pros: tool.pros.slice(0, 3), // Top 3 pros
      difficulty: tool.difficulty,
      rating: tool.rating
    }));

    // Generate AI recommendation
    const prompt = `
    Based on the user query "${query}" and the following available tools, provide personalized recommendations:

    Available Tools:
    ${JSON.stringify(toolsContext, null, 2)}

    User Preferences: ${JSON.stringify(preferences || {})}

    Please provide:
    1. Top 3-5 tool recommendations with detailed explanations
    2. Why each tool is suitable for the user's needs
    3. Comparison between recommended tools
    4. Specific use cases for each tool
    5. Pricing considerations

    Format the response as JSON with the following structure:
    {
      "recommendations": [
        {
          "toolName": "Tool Name",
          "reason": "Why this tool is recommended",
          "bestFor": "Specific use cases",
          "pricing": "Pricing summary",
          "difficulty": "beginner/intermediate/advanced",
          "pros": ["pro1", "pro2"],
          "cons": ["con1", "con2"]
        }
      ],
      "comparison": "Brief comparison of top recommendations",
      "summary": "Overall recommendation summary"
    }
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert AI tools consultant. Provide detailed, personalized recommendations for software tools based on user needs. Always be helpful, accurate, and consider pricing and difficulty levels."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 1500,
      temperature: 0.7
    });

    const aiResponse = JSON.parse(completion.choices[0].message.content);

    res.json({
      query,
      recommendations: aiResponse,
      totalTools: tools.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('AI recommendation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate recommendations',
      message: error.message 
    });
  }
});

// AI-powered search enhancement
router.post('/enhance-search', async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    // Use AI to enhance search terms
    const prompt = `
    Analyze this search query: "${query}"
    
    Provide:
    1. Main category this query belongs to
    2. Related keywords and synonyms
    3. Suggested search terms for better results
    4. Common tools in this category
    
    Format as JSON:
    {
      "category": "suggested category",
      "keywords": ["keyword1", "keyword2"],
      "suggestions": ["suggestion1", "suggestion2"],
      "relatedTools": ["tool1", "tool2"]
    }
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a search optimization expert. Help users find the right tools by enhancing their search queries."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 500,
      temperature: 0.5
    });

    const enhancedSearch = JSON.parse(completion.choices[0].message.content);

    res.json(enhancedSearch);

  } catch (error) {
    console.error('Search enhancement error:', error);
    res.status(500).json({ 
      error: 'Failed to enhance search',
      message: error.message 
    });
  }
});

// AI image generation
router.post('/image', async (req, res) => {
  try {
    const { prompt, size = '1024x1024', quality = 'standard', style = 'vivid' } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Generate image with OpenAI Images API
    const result = await openai.images.generate({
      model: 'gpt-image-1',
      prompt,
      size,
      quality,
      style,
      response_format: 'b64_json'
    });

    const imageBase64 = result.data[0]?.b64_json;
    if (!imageBase64) {
      return res.status(500).json({ error: 'Failed to generate image' });
    }

    res.json({
      prompt,
      size,
      image: imageBase64
    });
  } catch (error) {
    console.error('AI image generation error:', error);
    res.status(500).json({
      error: 'Failed to generate image',
      message: error.message
    });
  }
});

module.exports = router;


