import { apiConnector } from "../apiConnector";

const CHATBOT_API = `${process.env.REACT_APP_BASE_URL}/chatbot/chat`;

export const sendMessageToChatBot = async (message) => {
    try {

        const response = await apiConnector(
            "POST",
            CHATBOT_API,
            { message }
        );

        return response.data;

    } catch (error) {

        console.log("CHATBOT API ERROR:", error);

        return null;
    }
};