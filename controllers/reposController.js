const GithubRepo = require('../services/GithubRepo');

exports.show = async (req, res) => {
  let repoUrl;
  let owner;
  let repoName;
  let page;

  if (Object.keys(req.query).length) {
    repoUrl = req.query.repoUrl;
    [owner, repoName] = repoUrl.split('/').slice(3);
  } else {
    owner = req.params.owner;
    repoName = req.params.repoName;
    page = req.params.page;
  }

  try {
    const repo = new GithubRepo(owner, repoName, page);
    const {
      pullRequests,
      linkHeaders,
      currentPage
    } = await repo.getPullRequests();
    const pageCount = parseInt(linkHeaders.last.page);

    res.status(200).render('repos/show', {
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
