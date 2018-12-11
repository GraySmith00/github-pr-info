const fetch = require('jest-fetch-mock');
jest.setMock('node-fetch', fetch);

const GithubRepo = require('../GithubRepo');
const {
  mockPullRequests,
  mockPullRequests2,
  mockCommits,
  mockComments,
  mockCleanPullRequests
} = require('../mockData');

describe('GithubRepo class', () => {
  let repo;

  beforeEach(() => {
    repo = new GithubRepo('facebook', 'create-react-app');
  });

  it('should have an initial owner', () => {
    expect(repo.owner).toEqual('facebook');
  });

  it('should have an initial repo name', () => {
    expect(repo.repo).toEqual('create-react-app');
  });

  it('should have a default page of 1 if no page argument is passed in', () => {
    expect(repo.page).toEqual(1);
  });

  it('should be able to accept a page argument', () => {
    repo = new GithubRepo('facebook', 'create-react-app', 2);
    expect(repo.page).toEqual(2);
  });

  describe('getPullRequests', () => {
    it('should call fetch with the correct params', async () => {
      fetch.mockResponse(JSON.stringify(mockPullRequests));

      const url = `https://api.github.com/repos/facebook/create-react-app/pulls?client_id=${
        process.env.CLIENT_ID
      }&client_secret=${process.env.CLIENT_SECRET}&per_page=5&page=1`;

      await repo.getPullRequests();
      expect(fetch).toHaveBeenCalledWith(url);
    });
  });

  describe('cleanPullRequests', () => {
    it('should return the correct cleaned pull requests', async () => {
      const result = await repo.cleanPullRequests(mockPullRequests2);
      expect(result.login).toEqual(mockCleanPullRequests.login);
      expect(result.avatar_url).toEqual(mockCleanPullRequests.avatar_url);
    });
  });

  describe('getCommits', () => {
    it('should call fetch with the correct params', () => {
      const url = `https://api.github.com/repos/facebook/create-react-app/pulls/5818/commits?client_id=${
        process.env.CLIENT_ID
      }&client_secret=${process.env.CLIENT_SECRET}`;

      expect(fetch).toHaveBeenCalledWith(url);
    });

    it('should return the correct commits', async () => {
      fetch.mockResponse(JSON.stringify(mockCommits));
      const result = await repo.getCommits(
        'https://api.github.com/repos/facebook/create-react-app/pulls/5818/commits'
      );
      expect(result.author).toEqual(mockCommits.author);
      expect(result.commiter).toEqual(mockCommits.commiter);
    });
  });

  describe('getComments', () => {
    it('should call fetch with the correct params', () => {
      const url = `https://api.github.com/repos/facebook/create-react-app/issues/5818/comments?client_id=${
        process.env.CLIENT_ID
      }&client_secret=${process.env.CLIENT_SECRET}`;

      expect(fetch).toHaveBeenCalledWith(url);
    });

    it('should return the correct comments', async () => {
      fetch.mockResponse(JSON.stringify(mockComments));
      const result = await repo.getCommits(
        'https://api.github.com/repos/facebook/create-react-app/issues/5818/comments'
      );
      expect(result).toEqual(mockComments);
    });
  });
});
