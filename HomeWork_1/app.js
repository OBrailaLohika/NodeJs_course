const http = require('http');
const logger = require('./logger');

http
  .createServer((req, res) => {
    console.log('New incoming request');
    res.writeHeader(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Hello world!' }));
  })
  .listen(3000, logger.logger());
