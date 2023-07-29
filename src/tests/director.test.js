const request = require("supertest");
const app = require("../app");
require("../models");

let id;

test("GET /directors debe traer todos los directores", async () => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test("POST /directors debe crear un director", async () => {
    const director = {
        firstName: "Jhon",
        lastName: "Smith",
        nationality: "United States",
        image: "none",
        birthday: "2000-01-01"
    }
    const res = await request(app).post('/directors').send(director);
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(director.firstName);
    expect(res.body.id).toBeDefined();
});

test("PUT /directors/:id debe editar un director", async () => {
    const body = {
        firstName: "Jhon 2"
    }
    const res = await request(app).put(`/directors/${id}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName);
});

test("DELETE /directors/:id debe eliminar un director", async () => {
    const res = await request(app).delete(`/directors/${id}`);
    expect(res.status).toBe(204);
});