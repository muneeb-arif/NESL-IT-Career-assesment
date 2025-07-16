const request = require('supertest');
const { app } = require('./server');

describe('RBAC DELETE /api/posts/:id', () => {
  let userToken, adminToken;

  beforeAll(async () => {
    userToken = (await request(app).post('/api/login').send({ id: 'u1' })).body.token;
    adminToken = (await request(app).post('/api/login').send({ id: 'u2' })).body.token;
  });

  test('1. Admin can delete a post', async () => {
    const res = await request(app)
      .delete('/api/posts/123')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/Post 123 deleted/);
  });

  test('2. User is forbidden to delete a post', async () => {
    const res = await request(app)
      .delete('/api/posts/123')
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.status).toBe(403);
    expect(res.body.error).toBe('Forbidden');
  });

  test('3. Missing token returns 401', async () => {
    const res = await request(app).delete('/api/posts/123');
    expect(res.status).toBe(401);
    expect(res.body.error).toMatch(/Token is missing/);
  });
});
