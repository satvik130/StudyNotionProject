// Loading environment variables first
const dotenv = require("dotenv");
dotenv.config();

// Importing necessary modules and packages
const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payments");
const contactUsRoute = require("./routes/Contact");
const chatBotRoutes = require("./routes/ChatBot");
const aiRoadmapRoutes = require("./routes/AIRoadmap");
const aiRecommendationRoutes = require("./routes/AIRecommendations");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");

// Setting up port number
const PORT = process.env.PORT || 4000;

// Connecting to database
database.connect();

// Middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
	cors({
		origin: "*",
	})
);

app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);

// Connecting to Cloudinary
cloudinaryConnect();

// Setting up routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);
app.use("/api/v1/chatbot", chatBotRoutes);
app.use("/api/v1/ai", aiRoadmapRoutes);
app.use("/api/v1/ai", aiRecommendationRoutes);

// Testing the server
app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});

// Listening to the server
app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
});