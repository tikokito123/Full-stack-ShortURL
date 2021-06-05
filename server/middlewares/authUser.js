const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next)  {
    const token = req.cookies.jwt;
    if(!token) return res.status(401).send({
        message: 'no token provided, you need to login or sign up first via home page',
        redirect: '/'
    });
    try{
        const verified = jwt.verify(token, process.env.jwt);
        req.user = verified;
        next();
    }
    catch(ex) {
        res.status(400).send('Invalid token!');
    }
}

