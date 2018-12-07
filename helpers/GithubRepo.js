const fetch = require('node-fetch');
const cleanPullRequests = Symbol('cleanPullRequests');

class GithubRepo {
  constructor(owner, repo) {
    this.owner = owner;
    this.repo = repo;
  }

  async getPullRequests() {
    const url = `https://api.github.com/repos/${this.owner}/${
      this.repo
    }/pulls?client_id=${process.env.CLIENT_ID}&client_secret=${
      process.env.CLIENT_SECRET
    }`;
    const response = await fetch(url);
    const pullRequests = await response.json();
    const firstPage = pullRequests.slice(0, 10);
    const cleanPRs = this[cleanPullRequests](firstPage);
    return cleanPRs;
  }

  [cleanPullRequests](pullRequests) {
    const unresolved = pullRequests.map(async pr => {
      const { login, avatar_url, url: user_url } = pr.user;
      const { commits_url, comments_url, title, html_url } = pr;

      const [commits, comments] = await Promise.all([
        fetch(
          `${commits_url}?client_id=${process.env.CLIENT_ID}&client_secret=${
            process.env.CLIENT_SECRET
          }`
        ).then(r => r.json()),
        fetch(
          `${comments_url}?client_id=${process.env.CLIENT_ID}&client_secret=${
            process.env.CLIENT_SECRET
          }`
        ).then(r => r.json())
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

    return Promise.all(unresolved);
  }
}

module.exports = GithubRepo;
