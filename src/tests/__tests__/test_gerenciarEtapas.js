import supertest from "supertest";
import { mongoDB } from "../fixtures";
import app from "../../app";

let globalResponse;

beforeAll(async () => {
    mongoDB.connect();
    await mongoDB.mongoose.connection.dropDatabase();
    globalResponse = await supertest(app)
      .post("/newStage")
      .set("Content-Type", "application/json")
      .send({
        name: "name",
        time:"15",
        deleted: false,
      });
  }, 60000);
afterAll((done) => {
    mongoDB.disconnect(done);
});
describe("post new stage", () => {
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
        .set("Content-Type", "application/json")
        .send({
            name:"",
            time:"",
        });
        expect(response.status).toBe(500);
    });
});