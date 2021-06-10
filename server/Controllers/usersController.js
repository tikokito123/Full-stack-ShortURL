const {User} = require("../Models/userModel");
const bycrypt = require('bcrypt');

const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user).select("username email -_id");
  if (!user) return res.sendStatus(404, "cannot found the user");
  res.send({ user }).status(200);
};

const postUserLogin = async (req, res) => {
  const user = await User.findOne({
    username: req.body.username,
  });
  if (!user)
    return res.status(400).send({ message: "wrong username or password" });

  const validPassword = await bycrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send({ message: "wrong username or password" });

  const token = user.generateAuthToken();

  res.status(200).cookie("jwt", token, { httpOnly: true }).send({
    message: "success",
    token,
    redirect: "/short-url",
  });
};

const postSignupUser = async (req, res) => {
  //const { error } = validateUser(req.body);
  //if (error) return res.status(400).send({message: `bad request! ${error.details[0].message} IT IS RIGHT HERE??? `});
  const userExist = await User.findOne({ email: req.body.email });
  if (userExist && userExist.googleId === null)
    return res.status(400).send("user is already exist!");

  const googleExist = await User.findOne({ googleId: req.body.googleId });

  if (googleExist && req.body.googleId) {
    const token = googleExist.generateAuthToken();
    return res.cookie("jwt", token, { httpOnly: true }).status(200).send({
      message: "success",
      token,
      redirect: "/profile",
    });
  }

  const username = req.body.username || req.body.name;
  const user = new User({
    username: username,
    password: req.body.password,
    email: req.body.email,
    googleId: req.body.googleId,
  });

  if (user.password) {
    const salt = await bycrypt.genSalt(10);
    user.password = await bycrypt.hash(user.password, salt);
  }
  console.log(user);
  user.save();

  const token = user.generateAuthToken();

  res.cookie("jwt", token, { httpOnly: true }).status(201).send({
    message: "success",
    token,
    redirect: "/profile",
  });
};

const getAllUsers = async (req, res) => {
  const users = await User.find().select("username -_id");
  if (!users) return res.status(404).send("there are no users");

  res.send({ users: users });
};



module.exports = {
  getUserProfile,
  postUserLogin,
  postSignupUser,
  getAllUsers,
};
