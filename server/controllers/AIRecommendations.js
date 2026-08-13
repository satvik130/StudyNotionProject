const axios = require("axios");
const User = require("../models/User");

exports.generateRecommendations = async (req, res) => {

    try {

        const userId = req.user.id;

        const userDetails = await User.findById(userId)
            .populate("courses");

        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const enrolledCourses =
            userDetails.courses.map((course) => course.courseName);

        const prompt = `
        A student is enrolled in the following courses:

        ${enrolledCourses.join(", ")}

        Recommend:
        1. Best next courses to learn
        2. Skills they should focus on
        3. Career guidance
        4. Technologies they should learn next

        Keep recommendations concise and practical.
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

        const recommendations =
            response.data.choices[0].message.content;

        return res.status(200).json({
            success: true,
            recommendations,
        });

    } catch (error) {

        console.log(
            "AI RECOMMENDATION ERROR:",
            error.response?.data || error.message
        );

        return res.status(500).json({
            success: false,
            message: "Failed to generate recommendations",
        });
    }
};