const express = require("express");
const router = express.Router();
const authUser = require("../middlewares/authUser");
const urlModel = require("../Models/urlModel");
const urlController = require('../Controllers/urlsController');


router.get("/", authUser, urlController.getUserUrls);

router.post("/", authUser, urlController.createURL);

router.get("/:short", authUser, urlController.getFullRedirectURL);

module.exports = router;
