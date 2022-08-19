import supertest from "supertest";
import { mongoDB } from "../fixtures";
import app from "../../app";
import { createStage, createFlow } from "../fixtures";


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
