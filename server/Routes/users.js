const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {User, validateUser} = require('../Models/userModel');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

mongoose.connect('mongodb://localhost:27017/Users');


router.get('/',async (req, res) => {
    const users = await User.find().select('username -_id');
    if(!users) return res.status(404).send('there are no users');
    
    res.send({users: users});
});
router.post('/', (req, res) => {
    const {error} = validateUser(req.body);
    if(error) return res.status(400).send('bad request!');

    const user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    });
    console.log(user);
    user.save();
    res.status(200).send('succes');
});

module.exports = router;