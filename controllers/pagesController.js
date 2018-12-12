const getMostPopular = require('../services/getMostPopular');

exports.landingPage = async (req, res) => {
  const mostPopular = await getMostPopular();
  res.status(200).render('pages/landing', { mostPopular });
};
