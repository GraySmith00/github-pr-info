const GithubRepo = require('../services/GithubRepo');

exports.show = async (req, res) => {
  const { repoUrl } = req.query;
  const [owner, repoName] = repoUrl.split('/').slice(3);

  try {
    const repo = new GithubRepo(owner, repoName);
    const {
      pullRequests,
      linkHeaders,
      currentPage
    } = await repo.getPullRequests();
    const pageCount = parseInt(linkHeaders.last.page);

    res.render('repos/show', {
      pullRequests,
      linkHeaders,
      repoName,
      owner,
      pageCount,
      currentPage
    });
  } catch (error) {
    throw new Error(error);
  }
};

exports.getRepoPage = async (req, res) => {
  const { owner, repoName, page } = req.params;

  try {
    const repo = new GithubRepo(owner, repoName, page);
    const {
      pullRequests,
      linkHeaders,
      currentPage
    } = await repo.getPullRequests();
    const pageCount = parseInt(linkHeaders.last.page);

    res.render('repos/show', {
      pullRequests,
      linkHeaders,
      repoName,
      owner,
      pageCount,
      currentPage
    });
  } catch (error) {
    throw new Error(error);
  }
};
