# Full-stack-ShortURL
React app full stack with node js, react mongoose, redis, google authentication

welcome to Tinurl, this guide will help you set up the project

for that you will need: 

1. first of all make sure you have node.js, afterwards install create-react-app

2. go to client folder and server folder, do a npm install on both.

3. PACKAGES:
mongoose, npm i mongoose
redis, npm i redis
joi(optinal), npm i Joi,
express, npm i express,
dotenv, npm i dotenv,
jsonwebtoken, npm i jsonwebtoken,
bcrypt, npm i bcrypt,
shortid, npm i shortid
fs, should be installed with node.js, if not, npm i fs
react Router, npm i react-router-dom',
google authentication, npm i react-google-login


3. make sure you have mongoDBCompass on your computer, redis server, and node js.


4. go to the dir file through terminal at ./dirname/full-stack-SHORTURL/server and another terminal at 
./dirname/full-stack-SHORTURL/client, on both, do npm start. it will start the server on localhost:3001 and client on localhost:3000
make sure they are free to use for this one



# Running the app with Docker

this tutorial will guide you to how run the application with docker. this guide expect you to have a previous knowledge with docker.

1. install the repository to your computer

2. make sure you have installed docker

3. then, go to the server folder and do the next command on the terminal: docker build -t <tinurlserver> .

4. when the build is finished, go to the client folder on the terminal and do the same: docker build -t <tinurlclient> .

5. now when you have both of the images build on your docker engine, you can run all of the images as containers. We don't need to build redis and mongo, only to pull them from docker servers:

docker run -itd -p 3001:3001 tinurlserver
docker run -itd -p 3000:3000 tinurlclient
docker run -itd -p 6379:6379 redis
docker run server % docker run mongoDb -d -v ~/mongo/data:/data/db -p 27017:27017 mongo

This will do the work :)
have fun!