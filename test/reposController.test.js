const request = require('supertest');
const app = require('../app');
jest.mock('../services/GithubRepo');

describe('reposController', () => {
  it('should have a response status of 302 if there is not a repoName or owner', async () => {
    const res = await request(app).get('/repo');
    expect(res.status).toEqual(302);
  });

  it('should have a status of 200 if there is a valid repoURL', async () => {
    const res = await request(app)
      .get('/repo')
      .query({ repoUrl: 'https://github.com/facebook/create-react-app' });

    expect(res.status).toEqual(200);
  });
});
