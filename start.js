// Environment variables
require('dotenv').config({ path: '.env' });

// Start the Server
const app = require('./app');
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
