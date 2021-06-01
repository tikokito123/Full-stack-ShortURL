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

router.post('/login',async (req, res) => {
    const user = await User.find({
        username: req.body.username,
        password: req.body.password
    })
    if (!user) return res.status(404).send('wrong username or password');

    res.send(user).status(200); 
});

router.post('/signup', (req, res) => {
    const {error} = validateUser(req.body);
    if(error) return res.status(400).send('bad request!');

    const user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    });
    console.log(user);
    user.save();
    res.status(201).send({message: 'success'});
});

module.exports = router;