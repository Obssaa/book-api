FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
# Restart Docker Desktop on macOS
CMD ["node","src/index.js"]