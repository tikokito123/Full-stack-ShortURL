const Joi = require("joi");
const mongoose = require("mongoose");
const shortId = require("shortid");

require('dotenv').config();

const mongoPort = process.env.mongo || "mongodb://localhost:27017/Users";

mongoose
.connect(mongoPort, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.catch((err) => console.error(err));


const UrlSchema = mongoose.Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: shortId.generate
    },
    clicks: {
      type: Number,
      required: true,
      default: 0
    },
    userId: {
      type: String,
      required: true
    }
});
module.exports = mongoose.model('short-Urls', UrlSchema);
