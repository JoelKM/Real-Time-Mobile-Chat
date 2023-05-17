FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install pm2 -g

COPY  . .

ENV PORT=8000

EXPOSE 8000

CMD [ "npm", "start" ]