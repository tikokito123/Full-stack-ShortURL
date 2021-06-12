FROM node:alpine

WORKDIR /usr/app
RUN apk --no-cache add --virtual builds-deps build-base
COPY package.json .
RUN npm install

COPY . .
CMD [ "node", "server.js" ]