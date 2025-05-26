require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
const port = 5000; // Changed port to 5001 as you wanted

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middleware
app.use(cors());
app.use(express.json());

// Helper to detect if code is about a tree (basic check, can be improved)
function isTreeCode(code) {
  const lowerCode = code.toLowerCase();
  return lowerCode.includes('tree') || lowerCode.includes('left') || lowerCode.includes('right') || lowerCode.includes('node');
}

app.post('/api/explain', async (req, res) => {
  try {
    const { code, language = 'javascript' } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Code is required' });
    }

    // Choose prompt based on whether code is for a tree
    let prompt;

if (isTreeCode(code)) {
  prompt = `You are an expert in analyzing and visualizing ${language} algorithms.

Analyze the following code and return a concise explanation (3-5 steps) and a binary tree visualization **only if** the code creates a binary tree.

Respond in the following JSON format:
{
  "explanation": [
    { "t": "Step title", "d": "Short explanation" }
  ],
  "visualization": { "type": "tree", "root": { "value": 10, "left": { "value": 5 }, "right": { "value": 15 } } } Tree visualization should follow this example structure:
{
  "type": "tree",
  "root": {
    "value": 10,
    "left": {
      "value": 5
    },
    "right": {
      "value": 15
    }
  }
}

Code:
${code}`;
} else {
  prompt = `You are an expert in analyzing and visualizing ${language} code.

Analyze the following code and return a concise explanation (3–5 steps) and a minimal flowchart visualization for arrays or loops.

Respond in the following JSON format:
{
  "explanation": [
    { "t": "Step title", "d": "Short explanation" }
  ],
  "visualization": [
    {
      "t": "Step title",
      "type": "process" | "decision" | "start" | "end",
      "category": "loop" | "array" | "conditional",
      "d": "Short description of the operation"
    }
  ]
}

Code:
${code}`;
}

    if (!prompt) {
      return res.status(400).json({ error: 'Failed to generate prompt' });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a code analysis expert that provides clear explanations and visualization structures for ${language} code.`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 800,
    });

    // Parse and send the response back
    const response = JSON.parse(completion.choices[0].message.content);
    res.json(response);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to analyze code' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
