const request = require("supertest");
const app = require("../app");
const Actor = require("../models/Actor");
const Director = require("../models/Director");
const Genre = require("../models/Genre");
require("../models");

let id;

test("GET /movies debe traer todas las peliculas", async () => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test("POST /movies debe crear una pelicula", async () => {
    const movie = {
        name: "Example Film",
        image: "None",
        synopsis: "Example text",
        releaseYear: 2000
    }
    const res = await request(app).post('/movies').send(movie);
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(movie.name);
    expect(res.body.id).toBeDefined();
});

test("PUT /movies/:id debe editar una pelicula", async () => {
    const body = {
        name: "Example Film 2"
    }
    const res = await request(app).put(`/movies/${id}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
});

test("POST /movies/:id/actors debe establecer que actores participaron en una pelicula", async () => {
    const actor = await Actor.create({
        firstName: "Jhon",
        lastName: "Smith",
        nationality: "United States",
        image: "none",
        birthday: "2000-01-01"
    })
    const res = await request(app).post(`/movies/${id}/actors`).send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});

test('POST /movies/:id/directors debe establecer que directores participaron en una pelicula', async () => {
    const director = await Director.create({
        firstName: "Jhon",
        lastName: "Smith",
        nationality: "United States",
        image: "none",
        birthday: "2000-01-01"
    })
    const res = await request(app).post(`/movies/${id}/directors`).send([director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});

test('POST /movies/:id/genres debe establecer de que generos es una pelicula', async () => {
    const genre = await Genre.create({
        name: "Action",
    })
    const res = await request(app).post(`/movies/${id}/genres`).send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});

test("DELETE /movies/:id debe eliminar una pelicula", async () => {
    const res = await request(app).delete(`/movies/${id}`);
    expect(res.status).toBe(204);
});