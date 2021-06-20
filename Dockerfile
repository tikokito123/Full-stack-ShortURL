FROM node:alpine AS builder

WORKDIR /usr/app
RUN apk --no-cache add --virtual builds-deps build-base

COPY Client/package.json .
RUN npm install
COPY Client .
RUN npm run build


FROM node:alpine  
WORKDIR /usr/app
COPY server/package.json .
RUN npm install
COPY server .
COPY --from=builder ./build ./build
CMD [ "node", "server.js" ]
