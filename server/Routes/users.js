const express = require("express");
const router = express.Router();
const authUser = require("../middlewares/authUser");
const usersController = require('../Controllers/usersController');

router.get("/", usersController.getAllUsers);

router.get('/profile', authUser, usersController.getUserProfile)

router.post("/login", usersController.postUserLogin);

router.post("/signup", usersController.postSignupUser);

module.exports = router;
