const express = require('express');
const app = express();
const signUsers = require('./Routes/users');

app.use(express.json());

app.use('/users', signUsers);
app.get('/', (req, res) => {
    res.send({message: 'home'});
})
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Fuck my life ${port}`))