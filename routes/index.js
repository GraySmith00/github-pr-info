const express = require('express');
const router = express.Router();

// Import Controllers
const pagesController = require('../controllers/pagesController');
const reposController = require('../controllers/reposController');

// Routes
router.get('/', pagesController.landingPage);
router.get('/repo', reposController.show);
router.get('/:owner/repo/:repoName/page/:page', reposController.show);

module.exports = router;
