const express = require('express');
const router = express.Router();
const authUser = require('../middlewares/authUser');
const URL = require('../Models/urlModel');

router.get('/', authUser,async (req, res) => {
    const userUrls = await URL.find().where({userId: req.user});

    res.send({
        message: 'welcome to your short URL',
        urls: userUrls
    })
});

router.post('/', authUser, async (req, res) => {
    const url = new URL({
        full: req.body.url,
        userId: req.user
    });
    url.save();
    res.status(201).send({message: url});
});

module.exports = router;

