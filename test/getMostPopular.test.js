const fetch = require('jest-fetch-mock');
jest.setMock('node-fetch', fetch);

const getMostPopular = require('../services/getMostPopular');
const { mockPopularResponse, mockMostPopular2 } = require('./mockData');

describe('getMostPopular', () => {
  it('should call fetch with the correct params', () => {
    const url = `https://api.github.com/search/repositories?q=stars:>1+language:english&sort=stars&order=desc&type=Repositories&per_page=12&client_id=${
      process.env.CLIENT_ID
    }&client_secret=${process.env.CLIENT_SECRET}`;
    getMostPopular();
    expect(fetch).toHaveBeenCalledWith(url);
  });

  it('should return the correct clean repos', async () => {
    fetch.mockResponse(JSON.stringify(mockPopularResponse));
    const result = await getMostPopular();
    expect(result).toEqual(mockMostPopular2);
  });
});
