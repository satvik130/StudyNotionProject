const axios = require("axios");

exports.chatBot = async (req, res) => {
    try {

        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                message: "Message is required",
            });
        }

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openai/gpt-3.5-turbo",
                messages: [
                    {
                        role: "user",
                        content: message,
                    },
                ],
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const reply = response.data.choices[0].message.content;

        return res.status(200).json({
            success: true,
            reply,
        });

    } catch (error) {

        console.log(
            "CHATBOT ERROR:",
            error.response?.data || error.message
        );

        return res.status(500).json({
            success: false,
            message: "Failed to generate response",
        });
    }
};