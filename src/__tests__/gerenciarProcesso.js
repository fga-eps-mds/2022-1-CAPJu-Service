import supertest from "supertest";
import app from "../app";

// mocks necessários para não travar os testes
jest.mock("mongoose", () => {
  return { connect: async () => undefined };
});
jest.mock("../schemas/Process.js", () => {
  return {
    create: (json) => json,
    find: () => "foobar",
  };
});
test("testa o endpoint newProcess", async () => {
  const response = await supertest(app)
    .post("/newProcess")
    .set("Content-Type", "application/json")
    .send({
      registro: "foo",
      apelido: "bar",
    });
  expect(response.status).toBe(200);
  expect(response.body).toEqual({
    registro: "foo",
    apelido: "bar",
    ...response.body,
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
