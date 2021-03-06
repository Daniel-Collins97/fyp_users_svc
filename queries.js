const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: '35.228.14.148',
  database: 'finalyearprojectdb',
})

const getUsers = (request, response) => {
  pool.query('SELECT * FROM "Users"', (error, results) => {
    if (error) {
      response.status(500).json(error)
    } else {
      response.status(200).json(results.rows)
    }
  })
}

const getUsersById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('SELECT * FROM "Users" WHERE id = $1', [id], (error, results) => {
    if (error) {
      response.status(500).json(error)
    } else {
      response.status(200).json(results.rows)
    }
  })
}

const createUser = (request, response) => {
  const { firstName, lastName, age, height, weight, position } = request.body;

  pool.query('INSERT INTO "Users" ("firstName", "lastName", "age", "height", "weight", "position") VALUES ($1, $2, $3, $4, $5, $6)', [firstName, lastName, age, height, weight, position], (error) => {
    if (error) {
      response.status(500).json(error)
    } else {
      response.status(201).send(`User added`)
    }
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { firstName } = request.body;

  pool.query('UPDATE "Users" SET "firstName" = $1 WHERE id =$2', [firstName, id], (error) => {
    if (error) {
      response.status(500).json(error)
    } else {
      response.status(200).send(`User modified with ID: ${id}`);
    }
  })
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM "Users" WHERE id = $1', [id], (error) => {
    if (error) {
      response.status(500).json(error)
    } else {
      response.status(200).send(`User deleted with ID: ${id}`);
    }
  })
}

module.exports = {
  getUsers,
  getUsersById,
  createUser,
  updateUser,
  deleteUser,
}
