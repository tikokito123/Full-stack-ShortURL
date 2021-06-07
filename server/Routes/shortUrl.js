const express = require('express');
const router = express.Router();
const authUser = require('../middlewares/authUser');
const URL = require('../Models/urlModel');
const redis = require('redis');

const redisClient = redis.createClient(6379); 

router.get('/', authUser,async (req, res) => {
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
    const shortId = req.params.short;
    const url = await URL.findOne({short: req.params.short});
    
    redisClient.get(shortId, async (err, data) => {
        if(err) return console.log(err);
        if(!data){
            const url = await URL.findOne({short: shortId});
            redisClient.set(url.short, url.full);

            console.log('response from the API');

            url.clicks++;
            url.save();
            
            return res.status(301).send({
                message: url,
                redirect: url.full
            });
        }
        else {
            console.log('response from redis', data);
            
            url.clicks++;
            url.save();
            
            return res.status(301).send({
                message: url,
                redirect: url.full
            });
        }

    })

    


    
});

module.exports = router;

