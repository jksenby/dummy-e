const Pool = require("pg").Pool;
const { exec } = require("child_process");
const fs = require("fs");

const pool = new Pool({
  user: "postgres",
  host: "db",
  database: "hero",
  password: "postgres",
  port: 5432,
});

const getPrompts = (request, response) => {
  pool.query("SELECT * FROM hosts ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const handlePrompt = (request, response) => {
  const { prompt, file } = request.body;

  pool.query(
    "INSERT INTO hosts(name, project, ip1, ssh_type, ssh_key, login, password) VALUES($1, $2, $3, $4, $5, $6, $7);",
    [prompt, "", "", "", "", "", ""],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Host added`);
    }
  );
};

const deletePrompt = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM hosts Where id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Host deleted with ID: ${id}`);
  });
};

module.exports = {
  handlePrompt,
  getPrompts,
  deletePrompt,
};
