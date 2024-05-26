const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { messages } = req.body;
  console.log("Received messages:", messages);

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4o",
      messages: messages,
    });
    console.log("Response from OpenAI:", response.data);

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching chat response:", error);
    res.status(500).json({ 
      error: "An error occurred while fetching chat response", 
      details: error.message,
      stack: error.stack
    });
  }
};
