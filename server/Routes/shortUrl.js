const express = require('express');
const router = express.Router();
const authUser = require('../middlewares/authUser');


router.get('/', authUser, (req, res) => {
    res.send({
        message: 'welcome to your short URL'
    })
});

module.exports = router;

