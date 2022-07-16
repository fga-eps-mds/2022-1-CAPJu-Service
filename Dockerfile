FROM node:18-alpine

RUN yarn global add pm2@latest

WORKDIR /app

COPY ./src/package.json /app/package.json
COPY ./src/yarn.lock /app/yarn.lock

RUN yarn install
RUN yarn global add nodemon
CMD yarn run dev