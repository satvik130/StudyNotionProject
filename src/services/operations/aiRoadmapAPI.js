import { apiConnector } from "../apiConnector";

const AI_ROADMAP_API =
  `${process.env.REACT_APP_BASE_URL}/ai/generate-roadmap`;

export const generateAIRoadmap = async (goal) => {

    try {

        const response = await apiConnector(
            "POST",
            AI_ROADMAP_API,
            { goal }
        );

        return response.data;

    } catch (error) {

        console.log("AI ROADMAP API ERROR:", error);

        return null;
    }
};