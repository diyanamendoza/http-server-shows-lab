const OKMETHODS = ['POST', 'PUT', 'PATCH'];


const parseBody = async (req)  => {
  if (!OKMETHODS.includes(req.method)) return null;

  return new Promise((resolve, reject) => {
    //error if content-type !json
    if (req.headers['content-type'] !== 'application/json') { reject('Content-Type must be application/json'); return; 
    }

    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });

    req.on('end', async () => {
      try { resolve(JSON.parse(data));
      } catch (err) { reject('Bad JSON'); }
    });

  });
};

module.exports = parseBody;
