// Environment variables
require('dotenv').config({ path: '.env' });

// Start the Server
const app = require('./app');
const PORT = process.env.port || 3000;
const HOST = '0.0.0.0';
app.listen(PORT, HOST, () => {
  console.log(`App listening on port: ${PORT}`);
});
