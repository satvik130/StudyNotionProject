const express = require("express");

const router = express.Router();

const { generateRoadmap } = require("../controllers/AIRoadmap");

router.post("/generate-roadmap", generateRoadmap);

module.exports = router;