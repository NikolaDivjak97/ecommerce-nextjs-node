const express = require("express");
const router = express.Router();

const { homePage } = require("../controllers/pageController");

router.get("/home", homePage);

module.exports = router;
