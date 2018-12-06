const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const routes = require('./routes');

// Set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/application');
app.use(expressLayouts);

// Serve static files
app.use(express.static(path.join(__dirname, '/public')));

// Router
app.use('/', routes);

module.exports = app;
