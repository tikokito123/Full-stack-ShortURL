const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { User, validateUser } = require("../Models/userModel");
const bycrypt = require("bcrypt");

router.get("/", async (req, res) => {
  const users = await User.find().select("username -_id");
  if (!users) return res.status(404).send("there are no users");

  res.send({ users: users });
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({
    username: req.body.username,
  });
  if (!user)
    return res.status(400).send({ message: "wrong username or password" });

  const validPassword = await bycrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send({ message: "wrong username or password" });

  const token = user.generateAuthToken();

  res.status(200).cookie("jwt-auth", token, { httpOnly: true }).send({
    message: "success",
    token,
    redirect: '/short-url'
  });
});

router.post("/signup", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send({message: "bad request!"});

  const user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  });

  const salt = await bycrypt.genSalt(10);
  user.password = await bycrypt.hash(user.password, salt);

  user.save();

  const token = user.generateAuthToken();

  res.cookie("jwt-auth", token, { httpOnly: true }).status(201).send({
    message: "success",
    token,
    redirect: '/short-url'
  });
});

module.exports = router;
