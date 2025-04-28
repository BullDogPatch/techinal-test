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
  it('should fail when creating task without due_date', async () => {
    const res = await request(app).post('/create-task').send({
      title: 'Some title',
      description: 'some description',
      status: 'todo',
    });
    expect(res.statusCode).toBe(400);
  });
});

describe('Task API', () => {
  it('should return 200 OK and task data on GET /tasks/:id', async () => {
    const res = await request(app).get('/tasks/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.id).toEqual(1);
    expect(res.body).toHaveProperty('title');
    expect(res.body).toHaveProperty('description');
  });

  it('should return 404 if task not found on GET /tasks/:id', async () => {
    const res = await request(app).get('/tasks/999');
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toBe('Task not found');
  });

  // it('should return 500 for internal server errors on GET /tasks/:id', async () => {
  //   const res = await request(app).get('/tasks/1');
  //   expect(res.statusCode).toEqual(500);
  //   expect(res.body.message).toBe('Internal server error');
  // });
});
