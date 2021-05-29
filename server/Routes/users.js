const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
mongoose.connect('mongodb://localhost:27017/Users',)

router.post('/', (req, res) => {
    
});

module.exports = router;