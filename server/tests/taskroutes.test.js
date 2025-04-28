const request = require('supertest');
const app = require('../server');

describe('Task API', () => {
  it('should return 200 OK on GET /tasks', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
