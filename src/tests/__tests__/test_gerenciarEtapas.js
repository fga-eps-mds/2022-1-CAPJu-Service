import supertest from "supertest";
import { mongoDB } from "../fixtures";
import app from "../../app";

let globalResponse;

beforeAll(async () => {
  mongoDB.connect();
  await mongoDB.mongoose.connection.dropDatabase();

  globalResponse = await supertest(app)
    .post("/newStage")
    .send({
      name: "name",
      time: "15",
      deleted: false,
    });
});

console.log('ok1');

afterAll((done) => {
  mongoDB.disconnect(done);
});

test("testa o endpoint newStage", async () => {
  expect(globalResponse.status).toBe(200);
  expect(globalResponse.body).toEqual({
    name: "teste2Stage",
    time: "22",
    ...globalResponse.body,
  });
});

test("testa o endpoint newStage se der errado", async () => {
  const response = await supertest(app)
    .post("/newStage")
    .send({
      name: "",
      time: "",
    });
  expect(response.status).toBe(500);
});

test("testa o endpoint newStage duplicado", async () => {
  await supertest(app)
    .post("/newStage")
    .send({
      name: "teste",
      time: "123",
    });
  const response2 = await supertest(app)
    .post("/newStage")
    .send({
      name: "teste",
      time: "123",
    });  
  expect(response2.status).toBe(400);
});

test("testa a remoção de uma etapa em /deleteStage", async () => {
  const response = await supertest(app)
  .post("/deleteStage")
  .send({
    stageId: globalResponse.body._id
  });
  expect(response.status).toBe(200);
})