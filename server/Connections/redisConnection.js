const redis = require("redis");

require('dotenv').config();

const redisClient = redis.createClient({
  host: process.env.redisHost || 'localhost',
  port: process.env.redisPort || 6379,
});

module.exports.redisClient = redisClient;