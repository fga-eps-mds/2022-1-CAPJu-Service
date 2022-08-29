import supertest from "supertest";
import app from "../../app";
import { mongoDB, createFlow } from "../fixtures";

const REGISTRO1 = "1234";
const REGISTRO2 = "1111";
const REGISTRO3 = "5555";

let responseProcess1, responseProcess2, responseProcess3, flow, flow2;

beforeAll(async () => {
  mongoDB.connect();
  await mongoDB.mongoose.connection.dropDatabase();
  flow = await createFlow(app);
  flow2 = await createFlow(app, "flow2");
  responseProcess1 = await supertest(app).post("/newProcess").send({
    registro: REGISTRO1,
    apelido: "bar",
    arquivado: false,
    etapaAtual: flow.sequenceArray[0].from,
    fluxoId: flow.responseFlow.body._id,
  });
  responseProcess2 = await supertest(app).post("/newProcess").send({
    registro: REGISTRO2,
    apelido: "bar",
    arquivado: false,
    etapaAtual: flow.sequenceArray[0].from,
    fluxoId: flow.responseFlow.body._id,
  });
  responseProcess3 = await supertest(app).post("/newProcess").send({
    registro: REGISTRO3,
    apelido: "bar",
    arquivado: false,
    etapaAtual: flow2.sequenceArray[0].from,
    fluxoId: flow2.responseFlow.body._id,
  });
});

afterAll((done) => {
  mongoDB.disconnect(done);
});

describe("post new process", () => {
  test("testa o endpoint newProcess", async () => {
    expect(responseProcess1.status).toBe(200);
    expect(responseProcess1.body).toEqual({
      registro: REGISTRO1,
      apelido: "bar",
      ...responseProcess1.body,
    });
  });

  test("testa o endpoint newProcess se der errado", async () => {
    const response = await supertest(app)
      .post("/newProcess")
      .set("Content-Type", "application/json")
      .send({
        apelido: "bar",
      });
    expect(response.status).toBe(500);
  });
});

describe("get processes", () => {
  test("get all processes", async () => {
    const response = await supertest(app).get("/processes");
    expect(response.status).toBe(200);
  });
  test("testa o endpoint de pegar processo por fluxo", async () => {
    const response = await supertest(app).get(`/processes/${responseProcess1.body.fluxoId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      processes:[
        responseProcess1.body,
        responseProcess2.body
      ]
    });
  });
  test("testa o endpoint de pegar processo", async () => {
    
    const response = await supertest(app).get(`/getOneProcess/${responseProcess1.body._id}`);
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      responseProcess1.body
    );
    })
});


describe("delete processes", () => {
  test("testa o endpoint deleteProcess", async () => {
    const response = await supertest(app).delete(`/deleteProcess/${REGISTRO1}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      deletedCount: 1,
      acknowledged: true,
    });

    const responseError = await supertest(app).delete(
      `/deleteProcess/${REGISTRO1}`
    );
    expect(responseError.status).toBe(500);
  });
});
