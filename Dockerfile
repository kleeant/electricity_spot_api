FROM node:18.20.0-slim

WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .

EXPOSE 8080

CMD ["npm", "run", "build"]
CMD ["npm", "run", "start"]