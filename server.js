const http = require('http');
const app = require('./lib/app.js');

const PORT = process.env.PORT || 7890;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
