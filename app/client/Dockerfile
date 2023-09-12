
FROM node:alpine as builder

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5173

RUN npm run build
