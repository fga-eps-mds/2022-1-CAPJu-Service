# RESTful API Server

## About

- [Docker](https://www.docker.com/) Como serviço de containerização .
- [Node.js](https://nodejs.org/en/) (Latest Version) Como ambiente de execução de JavaScript.
- [Express.js](https://expressjs.com/) Como framework de servidor e camada de controller.
- [MongoDB](https://www.mongodb.com/) Como camada de banco de dados
- [Mongoose](https://mongoosejs.com/) Como camada "ODM" / model

## How to Install & Run

You will need to first download and install [Docker Desktop](https://www.docker.com/products/docker-desktop) or [Linux equivalent](https://docs.docker.com/install/linux/docker-ce/ubuntu/).

0.  Clone o repositório
0.  Rode `docker compose build` para instalar as dependencias.
1.  Rode `docker compose up` para iniciar os dois containers:
    - o container do banco de dados MongoDB.
    -  o container para a aplicação NodeJS
1.  O servidor está acessivel em `http://localhost:3333`. Talves seja necessário utilizar o IP ou url da network do docker ao invés de `localhost` (a porta continua sendo a mesma.)
