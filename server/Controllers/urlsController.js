const URL = require("../Models/urlModel");
const {redisClient} = require('../Connections/redisConnection');
require("dotenv").config();

redisClient.on("error", (err) => console.log(err));

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

  try {
    redisClient.get(req.user._id + `:` + shortId, async (err, data) => {
      if (err) return console.log(err);

      message = data;
      redirect = data;

      if (!data) {
        const url = await URL.findOne({ short: shortId });
        if (!url) return res.sendStatus(404, "Url did not found");

        redisClient.set(req.user._id + ":" + url.short, url.full);
        message = url;
        redirect = url.full;

        url.clicks++;
        url.save();
      }
      

      return res.status(200).send({
        message,
        redirect,
      });
    });

    const url = await URL.findOne({ short: shortId });
    if (!url) return res.sendStatus(404, "Url did not found");

    url.clicks++;
    url.save();
  } catch (ex) {
    console.log(ex, "check redis server");
    return res.sendStatus(500);
  }
};

module.exports = {
  getUserUrls,
  createURL,
  getFullRedirectURL: getRedirectURL,
};
