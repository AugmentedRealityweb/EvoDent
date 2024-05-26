require('dotenv').config();

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { messages } = req.body;
  console.log("Received messages:", messages);

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: messages,
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Response from OpenAI:", data);

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching chat response:", error);
    res.status(500).json({ 
      error: "An error occurred while fetching chat response", 
      details: error.message,
      stack: error.stack
    });
  }
};
