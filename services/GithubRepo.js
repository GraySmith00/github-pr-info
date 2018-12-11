const fetch = require('node-fetch');
const parse = require('parse-link-header');

class GithubRepo {
  constructor(owner, repo, page = 1) {
    this.owner = owner;
    this.repo = repo;
    this.page = page;
  }

  async getPullRequests() {
    const url = `https://api.github.com/repos/${this.owner}/${
      this.repo
    }/pulls?client_id=${process.env.CLIENT_ID}&client_secret=${
      process.env.CLIENT_SECRET
    }&per_page=5&page=${this.page}`;

    const response = await fetch(url);
    const pullRequests = await response.json();

    // parse linkHeaders for pagination
    const parsedLinkHeaders = parse(response.headers.get('link'));
    const cleanPRs = await this.cleanPullRequests(pullRequests);

    return {
      pullRequests: cleanPRs,
      linkHeaders: parsedLinkHeaders,
      currentPage: parseInt(this.page)
    };
  }

  async cleanPullRequests(pullRequests) {
    // iterate through all PRs and resolve with Promise.all
    const unresolved = pullRequests.map(async pr => {
      const { login, avatar_url, html_url: user_url } = pr.user;
      const { commits_url, comments_url, title, html_url } = pr;

      // get commits and comments for each PR and resolve with Promise.all
      const [commits, comments] = await Promise.all([
        this.getCommits(commits_url),
        this.getComments(comments_url)
      ]);

      return {
        title,
        html_url,
        login,
        user_url,
        avatar_url,
        numCommits: commits.length,
        numComments: comments.length
      };
    });

    const resolved = await Promise.all(unresolved);
    return resolved;
  }

  async getCommits(commits_url) {
    const url = `${commits_url}?client_id=${
      process.env.CLIENT_ID
    }&client_secret=${process.env.CLIENT_SECRET}`;
    const response = await fetch(url);
    const commits = await response.json();
    return commits;
  }

  async getComments(comments_url) {
    const url = `${comments_url}?client_id=${
      process.env.CLIENT_ID
    }&client_secret=${process.env.CLIENT_SECRET}`;
    const response = await fetch(url);
    const comments = await response.json();
    return comments;
  }
}

module.exports = GithubRepo;
