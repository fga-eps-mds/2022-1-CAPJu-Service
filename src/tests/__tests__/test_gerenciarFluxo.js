import supertest from "supertest";
import { mongoDB } from "../fixtures";
import app from "../../app";
import { createFlow, responseFlow2, responseFlow } from "../fixtures";

let flow;

beforeAll( async () => {
  mongoDB.connect();
  await mongoDB.mongoose.connection.dropDatabase();
  flow = await createFlow(app);

});

afterAll((done) => {
  mongoDB.disconnect(done);
});



test("testa fluxo criado", () => {
  const { name, sequenceArray, stageArray, responseFlow } = flow;
  expect(responseFlow.status).toBe(200);
  expect(responseFlow.body).toEqual({
    name: name,
    sequences: sequenceArray,
    stages: stageArray,
    deleted: false,
    ...responseFlow.body,
  });
});

test("testa se fluxo criado nao dar certo", async () => {
  const response = await supertest(app).post("/newFlow").send({
    name: "",
    deleted: false,
  });
  expect(response.status).toBe(500);
});

test("testa deletar fluxo", async () => {
  const {responseFlow} = flow;
  const response = await supertest(app).post("/deleteFlow").send({
    flowId: responseFlow.body._id,
  });
  expect(response.status).toBe(200);
});

test("testa nao encontrar fluxo para delecao", async () => {
  const {responseFlow2} = flow;
  const response = await supertest(app).post("/deleteFlow").send({
    flowId: responseFlow2.body._id,
  });
  expect(response.status).toBe(404);
});

test("testa nao deletar fluxo", async () => {
  const response = await supertest(app).post("/deleteFlow").send({
    flowId: "",
  });
  expect(response.status).toBe(500);
});

test("testa edicao de um fluxo", async () => {
  const response = await supertest(app).put("/editFlow").send({
    _id: responseFlow.body._id,
  });
  expect(response.status).toBe(200);
});

test("testa falha ao editar um fluxo", async () => {
  const response = await supertest(app).put("/editFlow").send({
    _id: "",
  });
  expect(response.status).toBe(500);
});

test("testa lista de fluxos", async () => {
  const response = await supertest(app).get("/flows").send({
    deleted: responseFlow2.body.deleted,
  });
  expect(response.status).toBe(200);
});
