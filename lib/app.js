const showsRouter = require('./shows.js');
const { readFile } = require('fs/promises');

const routes = { shows: showsRouter };

const app = async (req, res) => {

  const [, resource] = req.url.split('/');
  const route = routes[resource];

  if (req.url === '/') {
    try {
      const index = await readFile('public/index.html');
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html; charset=UTF-8');
      res.end(index);
    } catch (err) {
      res.statusCode = 500;
      res.end(err.message);
    }
  }
  else if (req.url === '/styles/main.css') {
    try {
      const css = await readFile('public/css/main.css');
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/css');
      res.end(css);
    } catch (err) {
      res.statusCode = 500;
      res.end(err.message);
    }
  }
  else if (req.url === '/bad-file' || req.url === '/styles') {
    res.statusCode = 404;
    res.end(`${req.url} Not Found`);
  }
  else if (route) {
    try {
      const routeHandler = route[req.method.toLowerCase()];
      await routeHandler(req, res);
    } catch (err) {
      console.log(err);
      res.statusCode = 500;
      res.end(err.message); }
  } else {
    res.statusCode = 404;
    res.end(`${req.url} Not Found`);
  }

};

module.exports = app;

