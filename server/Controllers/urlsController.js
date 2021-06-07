const URL = require("../Models/urlModel");
const redis = require('redis')

require('dotenv').config();

const redisPort = process.env.redis || 6379;
const redisClient = redis.createClient(redisPort);

const getUserUrls = async (req, res) => {
  const userUrls = await URL.find().where({ userId: req.user._id });
  if (!userUrls) return res.sendStatus(404, "cannot find the URLS");
  res.send({
    message: "welcome to your short URL",
    urls: userUrls,
  });
};

const createURL = async (req, res) => {
  const url = new URL({
    full: req.body.url,
    userId: req.user,
  });
  url.save();
  res.status(201).send({ message: url });
};

const getRedirectURL = async (req, res) => {
    const shortId = req.params.short;
  
    let message;
    let redirect;
  
    redisClient.get(req.user + `:` + shortId, async (err, data) => {
      if (err) return console.log(err);
      message = data;
      redirect = data;
      if (!data) {
        const url = await URL.findOne({ short: shortId });
        if (!url) return res.sendStatus(404, "Url did not found");
  
        redisClient.set(url.userId + ":" + url.short, url.full);
        message = url;
          redirect = url.full;
      }
  
      redisClient.incr(`${req.user}:${shortId}:clicks`, (err, clicked) =>
        console.log(clicked)
      );
  
      return res.status(200).send({
        message,
        redirect
      });
    });
  }
module.exports = {
  getUserUrls,
  createURL,
  getFullRedirectURL: getRedirectURL
};
