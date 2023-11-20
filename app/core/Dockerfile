FROM node:20-alpine

WORKDIR /app

RUN cd core

RUN npm install

RUN npm run build

CMD [ "npm", "run", "start:prod" ]
