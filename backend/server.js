const express = require('express');
const app = express();
const port = 8081;
const cors = require('cors');
const { Client } = require('pg');

app.use(express.json());
// Use the cors middleware
app.use(cors());

const client = new Client({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: '5432',
  database: 'users',
});

client
  .connect(null)
  .then(() => {
    console.log('Connected to PostgreSQL database');
  })
  .catch((err) => {
    console.error('Error connecting to PostgreSQL database', err);
  });

const exampleUser = {
  name: 'Ange',
  email: 'ange@mgmail.com',
  pass: 'pass',
  confirmPass: 'pass',
};

app.get('/users', (req, res) => {
  client.query('SELECT * FROM users ORDER BY id', (err, result) => {
    if (err) {
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).send(result.rows);
    }
  });
});

app.post('/users', (req, res) => {
  const { name, email, password } = req.body;
  const insertQuery =
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)';
  const queryParams = [name, email, password];

  client.query(insertQuery, queryParams, (err, result) => {
    if (err) {
      res.status(500).send('Internal Server Error');
    } else {
      res.status(201).send('{}');
    }
  });
});

app.patch('/users/:id', (req, res) => {
  const { name, email, password } = req.body;
  const updateQuery =
    'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4';
  const queryParams = [name, email, password, req.params.id];

  client.query(updateQuery, queryParams, (err, result) => {
    if (err) {
      console.error('Error executing query', err);
    } else {
      res.send('Successfully updated data !');
    }
  });
});

app.delete('/users/:id', (req, res) => {
  const deleteQuery = 'DELETE from users WHERE id = $1';
  const queryParams = [req.params.id];

  client.query(deleteQuery, queryParams, (err, result) => {
    if (err) {
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).send();
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
