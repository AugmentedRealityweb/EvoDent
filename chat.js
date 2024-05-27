export default async function handler(req, res) {
    const apiKey = process.env.OPENAI_API_KEY;
    console.log("Request received:", req.body);

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();
        console.log("Response from OpenAI:", data);

        if (!response.ok) {
            throw new Error(`OpenAI API error: ${data.error.message}`);
        }

        res.status(200).json(data);
    } catch (error) {
        console.error("Error communicating with OpenAI API:", error);
        res.status(500).json({ error: error.message });
    }
}
