import supertest from "supertest";
import { mongoDB } from "../fixtures";
import app from "../../app";

const STAGE1 = "STAGE1";
const STAGE2 = "STAGE2";
const STAGE3 = "STAGE3";

const createStage = async (stage) => {
  return await supertest(app).post("/newStage").send({
    name: stage,
  });
};

let responseFlow, stageArray, sequenceArray;

beforeAll(async () => {
  mongoDB.connect();
  await mongoDB.mongoose.connection.dropDatabase();
  const resStage1 = await createStage(STAGE1);
  const resStage2 = await createStage(STAGE2);
  const resStage3 = await createStage(STAGE3);
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

  responseFlow = await supertest(app)
    .post("/newFlow")
    .send({
      name: "flow1",
      stages: stageArray,
      sequences: sequenceArray,
  });
});

afterAll((done) => {
  mongoDB.disconnect(done);
});

test("testa fluxo criado", async () => {
  expect(responseFlow.status).toBe(200);
  expect(responseFlow.body).toEqual({
    name: "flow1",
    sequences: sequenceArray,
    stages: stageArray,
    deleted: false,
    ...responseFlow.body,
  });
});

test("testa se fluxo criado nao dar certo", async () => {
  const response = await supertest(app)
    .post("/newFlow")
    .send({
      name: "",
      deleted: false,
    });
  expect(response.status).toBe(500);
});
