const express = require("express");
const router = express.Router();
const authUser = require("../middlewares/authUser");
const URL = require("../Models/urlModel");
const redis = require("redis");
const urlsController = require('../Controllers/urlsController');

require('dotenv').config();

const redisPort = process.env.redis || 6379;
redis.createClient(redisPort);

router.get("/", authUser, urlsController.getUserUrls);

router.post("/", authUser, urlsController.createURL);

router.get("/:short", authUser, urlsController.getFullRedirectURL);

module.exports = router;
