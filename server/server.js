const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send({message: 'home'});
})
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Fuck my life ${port}`))