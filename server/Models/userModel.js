const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model('users', userSchema);

function validateUser(user){
    const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
    return schema.validate(user);
}
exports.validateUser = validateUser;
exports.User = User;