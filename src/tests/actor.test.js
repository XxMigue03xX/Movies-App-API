const request = require("supertest");
const app = require("../app");
require("../models");

let id;

test("GET /actors debe traer todos los actores", async () => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test("POST /actors debe crear un actor", async () => {
    const actor = {
        firstName: "Jhon",
        lastName: "Smith",
        nationality: "United States",
        image: "none",
        birthday: "2000-01-01"
    }
    const res = await request(app).post('/actors').send(actor);
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(actor.firstName);
    expect(res.body.id).toBeDefined();
});

test("PUT /actors/:id debe editar un actor", async () => {
    const body = {
        firstName: "Jhon 2"
    }
    const res = await request(app).put(`/actors/${id}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName);
});

test("DELETE /actors/:id debe eliminar un actor", async () => {
    const res = await request(app).delete(`/actors/${id}`);
    expect(res.status).toBe(204);
});