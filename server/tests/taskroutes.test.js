const request = require('supertest');
const app = require('../server');

describe('Task API', () => {
  it('should return 200 OK on GET /tasks', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
  it('should fail when creating task without title', async () => {
    const res = await request(app).post('/create-task').send({
      description: 'Missing title',
      status: 'todo',
      due_date: '2024-05-01',
    });
    expect(res.statusCode).toBe(400);
  });
});
