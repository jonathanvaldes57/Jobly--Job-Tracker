const { Pool } = require('pg');

const PG_URI =
  'postgres://uqrpjcxl:GMYWRFEh2fP6cb0PNPQ-6ZcwDIQEFNzj@drona.db.elephantsql.com/uqrpjcxl';

const pool = new Pool({
  connectionString: PG_URI,
});

pool
  .query(
    `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255)
  )
`
  )
  .then(() => {
    console.log('Table users created successfully');
  })
  .catch((err) => {
    console.error('Error creating table users: ', err);
  });

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
