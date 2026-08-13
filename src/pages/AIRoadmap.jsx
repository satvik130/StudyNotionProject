import React, { useState } from "react";
import { generateAIRoadmap } from "../services/operations/aiRoadmapAPI";

const AIRoadmap = () => {

    const [goal, setGoal] = useState("");
    const [loading, setLoading] = useState(false);
    const [roadmap, setRoadmap] = useState("");

    const handleGenerateRoadmap = async () => {

        if (!goal.trim()) return;

        setLoading(true);

        const response = await generateAIRoadmap(goal);

        if (response?.success) {
            setRoadmap(response.roadmap);
        } else {
            setRoadmap("Failed to generate roadmap.");
        }

        setLoading(false);
    };

    return (

        <div className="min-h-screen bg-richblack-900 text-white px-6 py-16">

            {/* Heading */}

            <div className="max-w-5xl mx-auto">

                <h1
                    className="text-4xl md:text-5xl font-bold
                    text-center mb-4"
                >
                    AI Career Roadmap Generator 🚀
                </h1>

                <p
                    className="text-richblack-300 text-center
                    text-lg mb-12"
                >
                    Generate personalized AI-powered learning roadmaps
                    for any tech career.
                </p>

                {/* Input Section */}

                <div
                    className="bg-richblack-800 border border-richblack-700
                    rounded-2xl p-6 flex flex-col md:flex-row gap-4
                    shadow-[0_0_40px_rgba(0,0,0,0.4)]"
                >

                    <input
                        type="text"
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        placeholder="Example: MERN Stack Developer"
                        className="flex-1 px-5 py-4 rounded-xl
                        bg-richblack-700 text-white
                        outline-none border border-richblack-600
                        focus:border-yellow-400"
                    />

                    <button
                        onClick={handleGenerateRoadmap}
                        className="bg-yellow-400 hover:bg-yellow-300
                        text-black font-semibold px-6 py-4
                        rounded-xl transition-all duration-300"
                    >
                        Generate Roadmap
                    </button>

                </div>

                {/* Loading */}

                {
                    loading && (
                        <div className="mt-10 text-center">

                            <div
                                className="w-16 h-16 border-4 border-yellow-400
                                border-t-transparent rounded-full animate-spin
                                mx-auto"
                            ></div>

                            <p className="mt-4 text-richblack-300">
                                AI is generating your roadmap...
                            </p>

                        </div>
                    )
                }

                {/* Roadmap Output */}

                {
                    roadmap && !loading && (
                        <div
                            className="mt-12 bg-richblack-800
                            border border-richblack-700
                            rounded-2xl p-8 whitespace-pre-wrap
                            leading-8 text-richblack-50
                            shadow-[0_0_40px_rgba(0,0,0,0.5)]"
                        >
                            {roadmap}
                        </div>
                    )
                }

            </div>

        </div>
    );
};

export default AIRoadmap;