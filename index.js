const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const db = knex({
  client: 'sqlite',
  useNullAsDefault: true,
  connection: {
    filename: "./data/lambda.sqlite3"
  },
});

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

// GET /api/zoos
server.get('/api/zoos', async (req, res) => {
  try {
    const zoos = await db('zoos');
    res.status(201).json(zoos)
  } catch (error) {
    res.status(500).json({ error })
  }
});

// GET /api/zoos/:id
server.get('/api/zoos/:id', async (req, res) => {
  try {
    const zoo = await db('zoos').where({ id: req.params.id });
    if (zoo.length) {
      res.status(201).json(zoo[0])
    } else {
      res.status(404).json({ message: 'The specified ID does not exist' })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
});

// POST /api/zoos
server.post('/api/zoos'), (req, res) => {
  try {
    const zoo = await db('zoos').insert(req.body);
    res.status(201).json(zoo)
  } catch (error) {
    res.status(500).json({error: 'Failed to add a new animal to the zoo :('})
  }
}

// PUT /api/zoos/:id
server.put('/api/zoos/:id'), (req, res) => {
  try {
    const zoo = await db('zoos').where({ id: req.params.id }).update(req.body);
    res.status(201).json(zoo);
  } catch (error) {
    res.status(500).json({error: 'Failed to update this animal informations.'})
  }
}

// DELETE /api/zoos/:id
server.delete('/api/zoos/:id'), (req, res) => {
  try {
    const zoo = await db('zoos').where({ id: req.params.id }).delete();
    res.status(201).json(zoo)
  } catch (error) {
    res.status(500).json({error: 'Failed to delete the specified animal'})
  }
}

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
