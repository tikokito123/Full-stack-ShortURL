const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const mongoPort = process.env.mongo || 'mongodb://localhost:27017/Users'
mongoose.connect(mongoPort, { useNewUrlParser: true, useUnifiedTopology: true }).then('connect on users model').catch(err => console.log(err));


const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    googleId: {
        type: Number
    }
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id}, process.env.jwt);
    return token;
}

const User = mongoose.model('users', userSchema);


function validateUser(user){
    const schema = Joi.object({
        username: Joi.string(),
        user: Joi.string(),
        email: Joi.string().email().required(),
    })
    return schema.validate(user);
}
exports.User = User;
exports.validateUser = validateUser;