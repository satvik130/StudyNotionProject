import { apiConnector } from "../apiConnector";

const AI_RECOMMENDATION_API =
  `${process.env.REACT_APP_BASE_URL}/ai/recommendations`;

export const getAIRecommendations = async (token) => {

    try {

        const response = await apiConnector(
            "GET",
            AI_RECOMMENDATION_API,
            null,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        return response.data;

    } catch (error) {

        console.log("AI RECOMMENDATION API ERROR:", error);

        return null;
    }
};