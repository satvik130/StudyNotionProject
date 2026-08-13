const axios = require("axios");

exports.generateRoadmap = async (req, res) => {

    try {

        const { goal } = req.body;

        if (!goal) {
            return res.status(400).json({
                success: false,
                message: "Goal is required",
            });
        }

        const prompt = `
        Create a detailed learning roadmap for becoming a ${goal}.

        Include:
        1. Beginner Phase
        2. Intermediate Phase
        3. Advanced Phase
        4. Important Skills
        5. Recommended Projects
        6. Interview Preparation Tips
        7. Career Guidance

        Format the response clearly with headings and bullet points.
        `;

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openai/gpt-3.5-turbo",
                messages: [
                    {
                        role: "user",
                        content: prompt,
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

        const roadmap =
            response.data.choices[0].message.content;

        return res.status(200).json({
            success: true,
            roadmap,
        });

    } catch (error) {

        console.log(
            "AI ROADMAP ERROR:",
            error.response?.data || error.message
        );

        return res.status(500).json({
            success: false,
            message: "Failed to generate roadmap",
        });
    }
};