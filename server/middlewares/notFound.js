require('dotenv').config();


module.exports = (req, res, next) => {
    res.status(404).send('Not Found! 404');
    next();
}