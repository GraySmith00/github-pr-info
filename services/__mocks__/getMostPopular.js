const fetch = require('node-fetch');
const mockGetMostPopular = require('../../services/getMostPopular');

const getMostPopular = async () => {
  return mockGetMostPopular;
};

module.exports = getMostPopular;
