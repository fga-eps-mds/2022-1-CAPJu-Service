FROM node:18-alpine

RUN yarn global add pm2@latest

WORKDIR /app

COPY ./src/package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
COPY ./yarn.lock /app/yarn.lock

RUN yarn  install --immutable --immutable-cache --check-cache
RUN yarn global add nodemon
CMD yarn run dev