FROM node:alpine

WORKDIR /home/node/app

COPY src src
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN apk add python make g++ libc-dev pkgconfig gcc
RUN apk add  --no-cache ffmpeg
RUN npm install

EXPOSE 3000

ENTRYPOINT [ "npm", "run", "start" ]