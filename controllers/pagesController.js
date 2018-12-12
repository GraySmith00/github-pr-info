const getMostPopular = require('../services/getMostPopular');

exports.landingPage = async (req, res) => {
  try {
    const mostPopular = await getMostPopular();
    res.status(200).render('pages/landing', { mostPopular, error: '' });
  } catch (err) {
    throw new Error(err);
  }
};
