const express = require('express');
const router = express.Router();
const authUser = require('../middlewares/authUser');
const URL = require('../Models/urlModel');

router.get('/', authUser,async (req, res) => {
    console.log(req.user._id);
    const userUrls = await URL.find().where({userId: req.user._id});

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

router.get('/:short', authUser,async (req, res) => {
    console.log(req.params.short);
    const url = await URL.findOne({short: req.params.short});
    if(!url) return res.status(404).send('cannot found the url you were looking for');

    url.clicks++;
    url.save();

    res.status(301).send({
        message: url,
        redirect: url.full
    });
});

module.exports = router;

