const express = require("express");
const app = express();
const signUsers = require("./Routes/users");
const shortUrl = require("./Routes/shortUrl");
const authUser = require("./middlewares/authUser");
const cookieParser = require("cookie-parser");
const { User } = require("./Models/userModel");
const URL = require("./Models/urlModel");
const fs = require('fs');
const {redisClient} = require('./Connections/redisConnection');
const path = require('path');

require("dotenv").config();

redisClient.on("error", (err) => console.log(err));

app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname ,'../build')));

//app.get('/*', (req, res) => {
//  res.sendFile(path.join(__dirname , '../build', '/index.html'));
//});

 
//routes
app.use("/users", signUsers);
app.use("/short-url", shortUrl);


app.get("/", (req, res) => {
  res.send({ message: "home" });
});

app.get("/admin-only", authUser, async (req, res) => {
  const adminUser = await User.findById(req.user);
  if(!adminUser) return res.sendStatus(404);
  
  const user = await User.find();
  if(!user) return res.sendStatus(404);
  
  console.log(user.username);

  if (adminUser.admin === false)
  return res.status(403).send({
      message: "only admins can see this page",
      redirect: "/Profile",
    });
  
  const url = await URL.find();

  res.send({
    urls: url
  })

  });
const not_found = require('./middlewares/notFound');
  app.use(not_found);

  const port = process.env.PORT || 3001;
  app.listen(port, () => console.log(`Fuck my life ${port}`));
  
  process.on('uncaughtException', (err, origin) => {
    fs.writeSync(
      process.stderr.fd,
      `Caught exception: ${err}\n` +
      `Exception origin: ${origin}`
    );
  });
  
