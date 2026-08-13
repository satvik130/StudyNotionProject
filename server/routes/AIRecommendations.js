const express = require("express");

const router = express.Router();

const {
    generateRecommendations,
} = require("../controllers/AIRecommendations");

const { auth } = require("../middlewares/auth");

router.get(
    "/recommendations",
    auth,
    generateRecommendations
);

module.exports = router;