# RESTful API Server

## Sobre

este é o repositório da API Rest do CAPJu e foi utilizado o seguinte para seu desenvolvimento:

- [Docker](https://www.docker.com/) Como serviço de containerização .
- [Node.js](https://nodejs.org/en/) (Latest Version) Como ambiente de execução de JavaScript.
- [Express.js](https://expressjs.com/) Como framework de servidor e camada de controller.
- [MongoDB](https://www.mongodb.com/) Como camada de banco de dados
- [Mongoose](https://mongoosejs.com/) Como camada "ODM" / model

## Como Execultar

será necessário ter o [Docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/) instalado para realizar os passos a seguir:

0.  Clone o repositório
0.  Rode `docker compose build` para instalar as dependencias.
1.  Rode `docker compose up` para iniciar os dois containers:
    - o container do banco de dados MongoDB.
    -  o container para a aplicação NodeJS
1.  O servidor está acessivel em `http://localhost:3333`.

## instalando dependecias
pode ser utilizado o seguinte comando para inserir novas dependencias no sistema
```
docker compose exec app yarn add "nome_da_dependencia"
```
uma alternativa ao comando acima é inserir a dependencia no arquivo [package.json](./src/package.json) rodar novamente `docker compose build`
## testes

Enquanto a aplicação estiver sendo execultada em um container docker é possivel rodar os testes execultando o script [test.sh](./test.sh)