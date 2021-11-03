const app = require('../lib/app.js');
const request = require('supertest');

describe('gets static files', () => {
  it('GET to / serves index.html', async () => {
    const res = await request(app).get('/');

    expect(res.text).toMatch('<!DOCTYPE html>');
  });

  it('GET to /styles/main.css serves main.css', async () => {
    const res = await request(app).get('/styles/main.css');

    expect(res.text).toMatch('@import');
  });

  it('GET to /bad-file returns 404', async () => {
    const res = await request(app).get('/bad-file');

    expect(res.statusCode).toBe(404);
  });

  it('GET to /styles returns 404', async () => {
    const res = await request(app).get('/styles');

    expect(res.statusCode).toBe(404);
  });

});
