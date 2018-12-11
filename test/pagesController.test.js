const request = require('supertest');
const app = require('../app');

describe('pagesController', () => {
  it('should call have a response status of 200', async () => {
    const res = await request(app).get('/');
    expect(res.status).toEqual(200);
  });
});
