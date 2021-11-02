const request = require('supertest');
const { rm, mkdir } = require('fs/promises');
const app = require('../lib/app.js');
const SimpleDB = require('../lib/simple-db.js');

const rootDir = `${__dirname}/../store/shows/`;

describe('shows CRUD API', () => {
  beforeEach(() => {
    return rm(rootDir, { force: true, recursive: true })
      .then(() => mkdir(rootDir, { recursive: true }));
  });

  afterAll(() => {
    return rm(rootDir, { force: true, recursive: true })
      .then(() => mkdir(rootDir, { recursive: true }));
  });
  
  it('creates a new show and returns it via POST', async () => {
    const show = { name: 'loki', genre: 'sci-fi' };
    const res = await request(app).post('/shows').send(show);

    expect(res.body).toEqual({ ...show, id: expect.any(String) });
  });

  it('gets a show by its id', async () => {
    const show = { name: 'the great british bake off', genre: 'reality' };
    const db = new SimpleDB(rootDir);
    await db.save(show);

    const res = await request(app).get(`/shows/${show.id}`);

    expect(res.body).toEqual(show);
  });

  it('updates a show via PUT', async () => {
    const show = { name: 'never have i ever', genre: 'drama' };
    const db = new SimpleDB(rootDir);
    await db.save(show);

    const update = { name: 'never have i ever', genre: 'teen drama' };

    const res = await request(app)
      .put(`/shows/${show.id}`)
      .send(update);

    expect(res.body).toEqual({ ...update, id: expect.any(String) });
  });

  it('deletes a show via DELETE', async () => {
    const show = { name: 'his dark materials', genre: 'fantasy drama' };
    const db = new SimpleDB(rootDir);
    await db.save(show);
      
    await request(app).delete(`/shows/${show.id}`);
    const res = await request(app).get(`/shows/${show.id}`);
    
    expect(res.body).toBeNull();
  });

});
