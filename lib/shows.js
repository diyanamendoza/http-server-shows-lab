const parseBody = require('./parse-body.js');
const SimpleDB = require('./simple-db');

const rootDir = `${__dirname}/../store/shows/`;
const db = new SimpleDB(rootDir);

const showsRouter = {
  async post(req, res) {
    const show = await parseBody(req);
    await db.save(show);
    const savedShow = await db.get(show.id);

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(savedShow));
  },

  async get(req, res) {
    const [, , id] = req.url.split('/');
    if (id) {
      const show = await db.get(id);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(show));
    } else {
      const allShows = await db.getAll();
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(allShows));
    }
  },

  async put(req, res) {
    const showUpdate = await parseBody(req);
    const [, , id] = req.url.split('/');
    showUpdate.id = id;
    await db.update(showUpdate);
    const updatedObj = await db.get(showUpdate.id);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(updatedObj));
  },

  async delete(req, res) {
    const [, , id] = req.url.split('/');
    await db.delete(id);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(`${id} Deleted`));
  }


};

module.exports = showsRouter; 
