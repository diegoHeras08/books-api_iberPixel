// tests/books.test.js
const request = require('supertest');
const app = require('../app');
const model = require('../models/books');

beforeEach(() => {
  model.resetData();
});

describe('Books API', () => {
  test('GET /api/books -> array', async () => {
    const res = await request(app).get('/api/books');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    // shape mínima
    if (res.body.length) {
      expect(res.body[0]).toHaveProperty('id');
      expect(res.body[0]).toHaveProperty('title');
      expect(res.body[0]).toHaveProperty('author');
      expect(res.body[0]).toHaveProperty('isRead');
      expect(res.body[0]).toHaveProperty('createdAt');
    }
  });

  test('POST /api/books -> crea libro', async () => {
    const payload = { title: 'Test Book', author: 'Tester' };
    const res = await request(app).post('/api/books').send(payload);
    expect(res.status).toBe(201);
    expect(res.body.title).toBe(payload.title);
    expect(res.body.author).toBe(payload.author);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('isRead', false); // por defecto
    expect(typeof res.body.createdAt).toBe('string');
  });

  test('GET /api/books/:id -> libro existente', async () => {
    const c = await request(app).post('/api/books').send({ title: 'X', author: 'Y' });
    const res = await request(app).get(`/api/books/${c.body.id}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(c.body.id);
  });

  test('GET /api/books/:id -> 404 si no existe', async () => {
    const res = await request(app).get('/api/books/nope');
    expect(res.status).toBe(404);
  });

  test('PUT /api/books/:id -> reemplaza (200)', async () => {
    const c = await request(app).post('/api/books').send({ title: 'A', author: 'B' });
    const res = await request(app)
      .put(`/api/books/${c.body.id}`)
      .send({ title: 'A2', author: 'B2', isRead: true });
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('A2');
    expect(res.body.author).toBe('B2');
    expect(res.body.isRead).toBe(true);
    expect(res.body.id).toBe(c.body.id); // id inmutable
  });

  test('PUT /api/books/:id -> 404 si no existe', async () => {
    const res = await request(app)
      .put('/api/books/not-found')
      .send({ title: 'X', author: 'Y', isRead: false });
    expect(res.status).toBe(404);
  });

  // --- PATCH /read: Caso A (sin body) => toggle
  test('PATCH /api/books/:id/read -> toggle sin body', async () => {
    const c = await request(app).post('/api/books').send({ title: 'T', author: 'U' });
    // valor inicial (por defecto false)
    const first = await request(app).get(`/api/books/${c.body.id}`);
    expect(first.body.isRead).toBe(false);

    const res = await request(app).patch(`/api/books/${c.body.id}/read`).send();
    expect(res.status).toBe(200);
    expect(res.body.isRead).toBe(true);

    // toggle otra vez sin body
    const res2 = await request(app).patch(`/api/books/${c.body.id}/read`).send();
    expect(res2.status).toBe(200);
    expect(res2.body.isRead).toBe(false);
  });

  // --- PATCH /read: Caso B (con body) => set explícito
  test('PATCH /api/books/:id/read -> set explícito con body', async () => {
    const c = await request(app).post('/api/books').send({ title: 'T', author: 'U' });

    const res = await request(app)
      .patch(`/api/books/${c.body.id}/read`)
      .send({ isRead: true });
    expect(res.status).toBe(200);
    expect(res.body.isRead).toBe(true);

    const res2 = await request(app)
      .patch(`/api/books/${c.body.id}/read`)
      .send({ isRead: false });
    expect(res2.status).toBe(200);
    expect(res2.body.isRead).toBe(false);
  });

  test('PATCH /api/books/:id/read -> 404 si no existe', async () => {
    const res = await request(app).patch('/api/books/xxx/read').send();
    expect(res.status).toBe(404);
  });

  test('DELETE /api/books/:id -> 204', async () => {
    const c = await request(app).post('/api/books').send({ title: 'D', author: 'E' });
    const res = await request(app).delete(`/api/books/${c.body.id}`);
    expect(res.status).toBe(204);

    // confirmar que ya no existe
    const getAgain = await request(app).get(`/api/books/${c.body.id}`);
    expect(getAgain.status).toBe(404);
  });

  test('DELETE /api/books/:id -> 404 si no existe', async () => {
    const res = await request(app).delete('/api/books/does-not-exist');
    expect(res.status).toBe(404);
  });
});