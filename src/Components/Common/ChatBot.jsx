import React, { useState } from "react";
import { sendMessageToChatBot } from "../../services/operations/chatbotAPI";

const ChatBot = () => {

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text: "Hello 👋 I am StudyNotion AI. How can I help you today?",
        },
    ]);

    const handleSendMessage = async () => {

        if (!message.trim()) return;

        const userMessage = {
            sender: "user",
            text: message,
        };

        setMessages((prev) => [...prev, userMessage]);

        const currentMessage = message;

        setMessage("");

        setLoading(true);

        const response = await sendMessageToChatBot(currentMessage);

        if (response?.success) {

            const botMessage = {
                sender: "bot",
                text: response.reply,
            };

            setMessages((prev) => [...prev, botMessage]);

        } else {

            const botMessage = {
                sender: "bot",
                text: "Something went wrong. Please try again.",
            };

            setMessages((prev) => [...prev, botMessage]);
        }

        setLoading(false);
    };

    return (
        <div>

            {/* Floating Chat Button */}

            <button
                onClick={() => setOpen(!open)}
                className="fixed bottom-6 right-6 z-[1000]
                w-16 h-16 rounded-full
                bg-gradient-to-r from-yellow-400 to-yellow-600
                flex items-center justify-center
                shadow-[0_0_25px_rgba(255,204,0,0.6)]
                hover:scale-110 transition-all duration-300"
            >
                <span className="text-3xl">🤖</span>
            </button>

            {/* Chat Window */}

            {
                open && (
                    <div
                        className="fixed bottom-24 right-6
                        w-[370px] h-[550px]
                        bg-richblack-900
                        border border-richblack-700
                        rounded-2xl
                        shadow-[0_0_40px_rgba(0,0,0,0.8)]
                        z-[1000]
                        flex flex-col
                        overflow-hidden"
                    >

                        {/* Header */}

                        <div
                            className="bg-gradient-to-r from-richblack-800 to-richblack-700
                            text-white p-4 flex items-center justify-between
                            border-b border-richblack-700"
                        >

                            <div className="flex items-center gap-3">

                                <div
                                    className="w-10 h-10 rounded-full bg-yellow-400
                                    flex items-center justify-center text-black font-bold text-lg"
                                >
                                    🤖
                                </div>

                                <div>
                                    <h2 className="font-semibold text-lg">
                                        StudyNotion AI
                                    </h2>

                                    <p className="text-xs text-richblack-300">
                                        Ask me anything
                                    </p>
                                </div>

                            </div>

                            <button
                                onClick={() => setOpen(false)}
                                className="text-richblack-200 hover:text-white text-xl"
                            >
                                ✕
                            </button>

                        </div>

                        {/* Messages */}

                        <div
                            className="flex-1 overflow-y-auto
                            p-4 space-y-4 bg-richblack-900"
                        >

                            {
                                messages.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`p-3 rounded-2xl max-w-[85%]
                                        text-sm leading-relaxed whitespace-pre-wrap
                                        ${msg.sender === "user"
                                                ? "bg-yellow-400 text-black ml-auto rounded-br-sm"
                                                : "bg-richblack-700 text-white rounded-bl-sm"
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                ))
                            }

                            {
                                loading && (
                                    <div
                                        className="bg-richblack-700 text-white
                                        p-3 rounded-2xl w-fit"
                                    >
                                        <div className="flex gap-1 text-lg">
                                            <span className="animate-bounce">•</span>
                                            <span className="animate-bounce delay-100">•</span>
                                            <span className="animate-bounce delay-200">•</span>
                                        </div>
                                    </div>
                                )
                            }

                        </div>

                        {/* Input Area */}

                        <div
                            className="p-3 border-t border-richblack-700
                            bg-richblack-800 flex gap-2"
                        >

                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Ask something..."
                                className="flex-1 px-4 py-3 rounded-xl
                                bg-richblack-700 text-white
                                outline-none border border-richblack-600
                                focus:border-yellow-400"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSendMessage();
                                    }
                                }}
                            />

                            <button
                                onClick={handleSendMessage}
                                className="bg-yellow-400 hover:bg-yellow-300
                                text-black px-5 rounded-xl
                                font-semibold transition-all duration-200"
                            >
                                ➤
                            </button>

                        </div>

                    </div>
                )
            }

        </div>
    );
};

export default ChatBot;