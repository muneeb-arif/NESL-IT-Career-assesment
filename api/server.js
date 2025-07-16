const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const routes = require('./routes');
app.use('/api', routes);

// Only start the server if this file is run directly
if (require.main === module) {
  const port = process.env.PORT || 9000;
  app.listen(port, () => console.log(`Server is running on port ${port}`));
}

module.exports = { app };