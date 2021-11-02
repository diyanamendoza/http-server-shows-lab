const showsRouter = require('./shows.js');

const routes = { shows: showsRouter };

const app = async (req, res) => {

  const [, resource] = req.url.split('/');
  const route = routes[resource];

  if (route) {
    try {
      const routeHandler = route[req.method.toLowerCase()];
      await routeHandler(req, res);
    } catch (err) {
      console.log(err);
      res.statusCode = 500;
      res.end(err.message); }
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }

};

module.exports = app;

