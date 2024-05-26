const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

module.exports = async function handler(req, res) {
  const { messages } = req.body;

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4o",
      messages: messages,
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching chat response:", error);
    res.status(500).json({ error: "An error occurred while fetching chat response" });
  }
};
