import supertest from "supertest";
import app from "../app";
import mongoose from "mongoose";

const mongoDB = {
    mongoose,
    connect: () => {
      mongoose.Promise = Promise;
      mongoose.connect(process.env.MONGODB_URI_TESTE || "mongodb://mongodb/capjuTeste");
    },
    disconnect: done => {
      mongoose.disconnect(done);
    }
};
const REGISTRO = '1234'

let globalResponse;

beforeAll(async () => {
    mongoDB.connect();
    await mongoDB.mongoose.connection.dropDatabase();
    globalResponse = await supertest(app)
        .post("/newProcess")
        .set("Content-Type", "application/json")
        .send({
            registro: REGISTRO,
            apelido: "bar"
        });
});

afterAll((done) => {
    mongoDB.disconnect(done);
});

describe('post new process', () => {
    test("testa o endpoint newProcess", async () => {
        expect(globalResponse.status).toBe(200)
        expect(globalResponse.body).toEqual({
            registro: REGISTRO,
            apelido: "bar",
            ...globalResponse.body
        });
    });

    test("testa o endpoint newProcess se der errado", async () => {
        const response = await supertest(app)
            .post("/newProcess")
            .set("Content-Type", "application/json")
            .send({
                apelido: "bar"
            });
        expect(response.status).toBe(500);
    });
});

describe('delete processes', ()=>{
    test(" testa o endpoint deleteProcess", async () =>{
        const response = await (await supertest(app).delete(`/deleteProcess/${REGISTRO}`));
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            deletedCount: 1,
            acknowledged: true
        });

        const responseError = await (await supertest(app).delete(`/deleteProcess/${REGISTRO}`));
        expect(responseError.status).toBe(500);

    });
});