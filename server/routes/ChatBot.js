const express = require("express");

const router = express.Router();

const { chatBot } = require("../controllers/ChatBot");

router.post("/chat", chatBot);

module.exports = router;