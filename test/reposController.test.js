const request = require('supertest');
const app = require('../app');
jest.mock('../services/GithubRepo');

describe('reposController', () => {
  it('should call have a response status of 200', async () => {
    const res = await request(app).get('/repo');
    expect(res.status).toEqual(200);
  });
});
