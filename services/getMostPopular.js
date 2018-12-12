const fetch = require('node-fetch');

const getMostPopular = async () => {
  const url = `https://api.github.com/search/repositories?q=stars:>1+language:english&sort=stars&order=desc&type=Repositories&per_page=12&client_id=${
    process.env.CLIENT_ID
  }&client_secret=${process.env.CLIENT_SECRET}`;
  const response = await fetch(url);
  const popularRepos = await response.json();
  const cleanRepos = getCleanRepos(popularRepos.items);
  return cleanRepos;
};

const getCleanRepos = repos => {
  return repos.map(repo => {
    const { name: repoName, html_url, language, stargazers_count } = repo;
    const { login, avatar_url } = repo.owner;
    return {
      repoName,
      html_url,
      language,
      stargazers_count,
      login,
      avatar_url
    };
  });
};

module.exports = getMostPopular;
