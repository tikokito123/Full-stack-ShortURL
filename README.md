# Full-stack-ShortURL


### Running the app with Docker

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



# Run Application With Docker-Compose (Recommended)

1. Make sure you have docker engine installed on your machine

2. On the terminal/cmd, Go to the directory of the project, and simply do **docker-compose up**