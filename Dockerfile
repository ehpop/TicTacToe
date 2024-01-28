FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY src ./src
COPY public ./public

RUN npm install

EXPOSE 3000