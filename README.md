# RESTful API Server

## About

- [Docker](https://www.docker.com/) as the container service to isolate the environment.
- [Node.js](https://nodejs.org/en/) (Long-Term-Support Version) as the run-time environment to run JavaScript.
- [Express.js](https://expressjs.com/) as the server framework / controller layer
- [MongoDB](https://www.mongodb.com/) as the database layer
- [Mongoose](https://mongoosejs.com/) as the "ODM" / model layer

## How to Install & Run

You will need to first download and install [Docker Desktop](https://www.docker.com/products/docker-desktop) or [Linux equivalent](https://docs.docker.com/install/linux/docker-ce/ubuntu/).

0.  Fork/Clone the repo
1.  Run `docker-compose up` to start three containers:
    - the MongoDB database container
    - the Node.js app container
1.  Server is accessible at `http://localhost:8080` if you have Docker for Windows or Mac. On Linux, you may need to hit the IP Address of the docker-machine rather than `localhost` (port rules are the same.)
