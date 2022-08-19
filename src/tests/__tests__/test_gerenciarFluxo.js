import supertest from "supertest";
import { mongoDB } from "../fixtures";
import app from "../../app";
import { createStage } from "../fixtures"


let responseFlow, stageArray, sequenceArray;

beforeAll(async () => {
  mongoDB.connect();
  await mongoDB.mongoose.connection.dropDatabase();
  const resStage1 = await createStage('stage1', '15', app);
  const resStage2 = await createStage('stage2', '15', app);
  const resStage3 = await createStage('stage3', '15', app);
  stageArray = [resStage1.body._id, resStage2.body._id, resStage3.body._id];

  const sequenceArray = [
    {
      from: resStage1.body._id,
      to: resStage2.body._id,
    },
    {
      from: resStage2.body._id,
      to: resStage3.body._id,
    },
  ];

  responseFlow = await supertest(app).post("/newFlow").send({
    name: "flow1",
    stages: stageArray,
    sequences: sequenceArray,
  });
});

afterAll((done) => {
  mongoDB.disconnect(done);
});

test("testa fluxo criado", () => {
  expect(responseFlow.status).toBe(200);
  expect(responseFlow.body).toEqual({
    name: "flow1",
    sequences: sequenceArray,
    stages: stageArray,
    deleted: false,
    ...responseFlow.body,
  });
});
