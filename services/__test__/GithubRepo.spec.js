const GithubRepo = require('../GithubRepo');
const fetch = require('node-fetch');
const mockPullRequest = require('../mockData').mockPullRequests;

describe('GithubRepo class', () => {
  let repo;

  beforeEach(() => {
    repo = new GithubRepo('facebook', 'create-react-app');
    jest.setMock('node-fetch', fetch);
  });

  it('should have an initial owner', () => {
    expect(repo.owner).toEqual('facebook');
  });

  it('should have an initial repo name', () => {
    expect(repo.repo).toEqual('create-react-app');
  });

  it('should call fetch with the correct params', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve(mockPullRequests)
      });
    });
    repo.getPullRequests();
    expect(window.fetch).toHaveBeenCalled();
  });
});
