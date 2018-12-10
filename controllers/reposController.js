const GithubRepo = require('../services/GithubRepo');

exports.show = async (req, res) => {
  const { repoUrl } = req.query;
  const [owner, repoName] = repoUrl.split('/').slice(3);
  const repo = new GithubRepo(owner, repoName);
  const pullRequests = await repo.getPullRequests();
  console.log(pullRequests);
  res.render('repos/show', { pullRequests });
};
