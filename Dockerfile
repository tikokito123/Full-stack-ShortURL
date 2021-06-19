FROM node:alpine

WORKDIR /usr/app
RUN apk --no-cache add --virtual builds-deps build-base

COPY Client .
RUN npm install && npm run build 

COPY server .
RUN npm install

COPY . .
CMD [ "node", "server/server.js" ]

