const express = require('express');
const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

// GET /api/zoos
server.get('/api/zoos'), (res, req) => {
  res.json({ message: '[GET] /api/zoos' })
}

// GET /api/zoos/:id
server.get('/api/zoos/:id'), (res, req) => {
  res.json({ message: '[GET] /api/zoos/:id' })
}

// POST /api/zoos
server.post('/api/zoos'), (res, req) => {
  res.json({ message: '[POST] /api/zoos' })
}

// PUT /api/zoos/:id
server.put('/api/zoos/:id'), (res, req) => {
  res.json({ message: '[PUT] /api/zoos' })
}

// DELETE /api/zoos/:id
server.DELETE('/api/zoos/:id'), (res, req) => {
  res.json({ message: '[DELETE] /api/zoos' })
}


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
