const EventEmitter = require('events');
const parseBody = require('../lib/parse-body.js');

it('returns null if method is not POST, PUT, or PATCH', async () => {
  expect(await parseBody({ method: 'GET' })).toBe(null);
  expect(await parseBody({ method: 'DELETE' })).toBe(null);
});

it('throws if content-type is not app/json', async () => {
  const req = { method: 'POST', headers: { 'content-type': 'wrong type' } };
  //verify that one thing was actually called
  expect.assertions(1);
  try {
    await parseBody(req);
  } catch (err) {
    expect(err).toEqual('Content-Type must be application/json');
  }
});

it('returns a deserialized body from req emitted events', async () => {
  const req = new EventEmitter();
  req.headers = { 'content-type': 'application/json' };
  req.method = 'POST';
  const promise = parseBody(req);
  req.emit('data', '{"ta":');
  req.emit('data', '"da"}');
  req.emit('end');

  const body = await promise;
  expect(body).toEqual({ ta: 'da' });
});

