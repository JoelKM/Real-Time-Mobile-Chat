FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install pm2 -g

COPY  . .

ENV PORT=8080

EXPOSE 8080

CMD [ "pm2-runtime", "src/main.js" ]