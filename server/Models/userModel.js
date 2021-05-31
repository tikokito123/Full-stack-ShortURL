const Joi = require('joi');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Users',  { useNewUrlParser: true, useUnifiedTopology: true }).then('connect on users model').catch(err => console.log(err));

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
exports.User = User;
exports.validateUser = validateUser;