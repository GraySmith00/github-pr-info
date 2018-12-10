const GithubRepo = require('../services/GithubRepo');

exports.show = async (req, res) => {
  const { repoUrl } = req.query;
  const [owner, repoName] = repoUrl.split('/').slice(3);

  try {
    const repo = new GithubRepo(owner, repoName);
    const { pullRequests, linkHeaders } = await repo.getPullRequests();

    res.render('repos/show', {
      pullRequests,
      linkHeaders,
      repoName,
      owner
    });
  } catch (error) {
    throw new Error(error);
  }
};
