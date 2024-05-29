const express = require("express");
const app = express();
const port = 8081;
const cors = require("cors");
const { Client } = require("pg");

app.use(express.json());

app.use(cors());

const client = new Client({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: "5432",
  database: "users",
});

client
  .connect(null)
  .then(() => {
    console.log("Connected to PostgreSQL database");
  })
  .catch((err) => {
    console.error("Error connecting to PostgreSQL database", err);
  });

const exampleUser = {
  name: "Ange",
  email: "ange@mgmail.com",
  pass: "pass",
  confirmPass: "pass",
};

app.get("/users", (req, res) => {
  client.query("SELECT * FROM users ORDER BY id", (err, result) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).send(result.rows);
    }
  });
});

app.post("/users", async (req, res) => {
  const { name, email, password } = req.body;
  const insertQuery =
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)";
  const queryParams = [name, email, password];

  try {
    const result = await client.query(insertQuery, queryParams);
    res.status(201).send("{}");
  } catch (err) {
    if (err.code == 23505) {
      res
        .status(400)
        .send({ error: `User with ${email} email address already exists` });
    } else {
      res.status(500).send("Internal Server Error");
    }
  }
});

app.patch("/users/:id", async (req, res) => {
  const { name, email, password } = req.body;
  const updateQuery =
    "UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4";
  const queryParams = [name, email, password, req.params.id];

  try {
    const result = await client.query(updateQuery, queryParams);
    res.status(201).send("{}");
  } catch (err) {
    if (err.code == 23505) {
      res.status(400).send({ error: `User with ${email} already exists` });
    } else {
      res.status(500).send("Internal Server Error");
    }
  }
});

app.delete("/users/:id", (req, res) => {
  const deleteQuery = "DELETE from users WHERE id = $1";
  const queryParams = [req.params.id];

  client.query(deleteQuery, queryParams, (err, result) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).send();
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
