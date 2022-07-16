import supertest from "supertest";
import app from '../app'

const somaDois = (a, b) => a + b;

test("testa uma função que soma dois numeros", () => {
    expect(somaDois(1, 2)).toBe(3)
    expect(somaDois(1, 3)).toBe(4)
});

// mocks necessários para não travar os testes
jest.mock("mongoose", () => {
    return { connect: async () => undefined }
});
jest.mock("../schemas/Process.js", () => {
    return {
        create: (json) => json,
        find: () => "foobar"
    }
});
test("testa o endpoint newProcess", async () => {
    const response = await supertest(app)
        .post("/newProcess")
        .set("Content-Type", "application/json")
        .send({
            registro: "foo",
            apelido: "bar"
        });
    expect(response.status).toBe(200)
    expect(response.body).toEqual({
        registro: "foo",
        apelido: "bar",
        ...response.body
    });
});
