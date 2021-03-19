const { createServer } = require('http');
const { readFileSync } = require('fs');
const { join } = require('path');

const { name: NAME } = JSON.parse(readFileSync(join(__dirname, 'package.json'), 'utf-8'));
const PORT = process.env.PORT || 5000;

const handlers = {
  pingHandler: {
    method: 'GET',
    path: /^\/ping$/,
    handler: (_req, res) => {
      res.statusCode = 200;
      res.end('Pong');
    },
  },
};

const server = createServer((req, res) => {
  const { handler } = Object.values(handlers).find(({ method, path }) => method === req.method && path.test(req.url)) || {};
  if (handler) {
    handler(req, res);
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`${NAME} is running on port ${PORT}`);
});
