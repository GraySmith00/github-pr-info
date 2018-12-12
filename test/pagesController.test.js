const request = require('supertest');
const app = require('../app');
const { mockMostPopular } = require('../test/mockData');
const getMostPopular = require('../services/getMostPopular');
jest.mock('../services/getMostPopular');

describe('pagesController', () => {
  it('should call getMostPopular', async () => {
    await request(app).get('/');
    expect(getMostPopular).toHaveBeenCalled();
  });

  it('should call have a response status of 200', async () => {
    const res = await request(app).get('/');
    expect(res.status).toEqual(200);
  });
});
