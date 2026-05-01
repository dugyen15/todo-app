const request = require('supertest');
const app = require('../server');

beforeEach(() => {
  app.resetTodos();
});

describe('Todo API', () => {
  test('GET /api/todos - returns empty array initially', async () => {
    const res = await request(app).get('/api/todos');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  test('POST /api/todos - creates a new todo', async () => {
    const res = await request(app)
      .post('/api/todos')
      .send({ text: 'Buy groceries' });
    expect(res.statusCode).toBe(201);
    expect(res.body.text).toBe('Buy groceries');
    expect(res.body.completed).toBe(false);
    expect(res.body.id).toBeDefined();
  });

  test('POST /api/todos - rejects empty text', async () => {
    const res = await request(app)
      .post('/api/todos')
      .send({ text: '' });
    expect(res.statusCode).toBe(400);
  });

  test('PUT /api/todos/:id - toggles completion', async () => {
    const create = await request(app)
      .post('/api/todos')
      .send({ text: 'Study CI/CD' });
    const id = create.body.id;

    const toggle = await request(app).put(`/api/todos/${id}`);
    expect(toggle.body.completed).toBe(true);

    const toggleBack = await request(app).put(`/api/todos/${id}`);
    expect(toggleBack.body.completed).toBe(false);
  });

  test('DELETE /api/todos/:id - deletes a todo', async () => {
    const create = await request(app)
      .post('/api/todos')
      .send({ text: 'Deploy to Render' });
    const id = create.body.id;

    const del = await request(app).delete(`/api/todos/${id}`);
    expect(del.statusCode).toBe(200);

    const getAll = await request(app).get('/api/todos');
    expect(getAll.body.length).toBe(0);
  });

  test('DELETE /api/todos/:id - returns 404 for non-existent todo', async () => {
    const res = await request(app).delete('/api/todos/999');
    expect(res.statusCode).toBe(404);
  });
});