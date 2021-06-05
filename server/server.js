const express = require('express');
const app = express();
const signUsers = require('./Routes/users');
const shortUrl = require('./Routes/shortUrl');
const authUser = require('./middlewares/authUser');
const cookieParser = require('cookie-parser');
const { User } = require('./Models/userModel');
const URL = require('./Models/urlModel');
app.use(express.json());
app.use(cookieParser());

app.use('/users', signUsers);
app.use('/short-url', shortUrl);
app.get('/', (req, res) => {
    res.send({message: 'home'});
})

app.get('/admin-only', authUser, async (req, res) => {
    const user = await User.findById(req.user);
    if(user.admin === false) return res.status(403).send({
        message: 'only admins can see this page',
        redirect: '/Profile'
    });
    const url = await URL.find().select('clicks short');
    res.status(200).send({
        message: 'welcome back admin',
        urls: url
    })
})
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Fuck my life ${port}`))