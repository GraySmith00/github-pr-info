const fetch = require('node-fetch');
const parse = require('parse-link-header');
const {
  mockCleanPullRequests,
  mockLinkHeaders
} = require('../../test/mockData');

class GithubRepo {
  constructor(owner, repo, page = 1) {
    this.owner = owner;
    this.repo = repo;
    this.page = page;
  }

  getPullRequests() {
    return {
      pullRequests: mockCleanPullRequests,
      linkHeaders: mockLinkHeaders,
      currentPage: 1
    };
  }
}

module.exports = GithubRepo;
