const express = require("express");
const router = express.Router();
const { User, validateUser } = require("../Models/userModel");
const bycrypt = require("bcrypt");
const authUser = require("../middlewares/authUser");
const usersController = require('../Controllers/usersController');

router.get("/", usersController.getAllUsers);

router.get('/profile', authUser, usersController.getUserProfile)

router.post("/login", usersController.postUserLogin);

router.post("/signup", usersController.postSignupUser);

module.exports = router;
