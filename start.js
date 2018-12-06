// Start the Server
const app = require('./app');
const PORT = process.env.port || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
