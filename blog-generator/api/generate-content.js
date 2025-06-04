const path = require('path');
const OpenAIBlogGenerator = require('../../blog/blog-automation/openai-integration.js');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { keyword, options } = req.body;
        
        if (!keyword) {
            return res.status(400).json({ error: 'Keyword is required' });
        }

        const generator = new OpenAIBlogGenerator();
        const content = await generator.generateSEOOptimizedContent(keyword, options);
        
        res.status(200).json({ success: true, content });
    } catch (error) {
        console.error('OpenAI generation error:', error);
        res.status(500).json({ 
            error: 'Content generation failed',
            message: error.message 
        });
    }
};
