exports.show = (req, res) => {
  const { repoUrl } = req.query;
  console.log(repoUrl.split('/').slice(3));
  res.render('repos/show');
};
