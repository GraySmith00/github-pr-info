const { mockMostPopular } = require('../../test/mockData');

const getMostPopular = jest.fn().mockImplementation(() => mockMostPopular);

module.exports = getMostPopular;
