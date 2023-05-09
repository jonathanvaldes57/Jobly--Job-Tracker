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

pool
  .query(
    `
  CREATE TABLE IF NOT EXISTS jobs (
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(255),
    job_title VARCHAR(255),
    interest_level VARCHAR(255),
    status VARCHAR(255),
    url VARCHAR(255),
    date VARCHAR(255),
    description VARCHAR(255),
    users_id INTEGER REFERENCES users(id)
  )
`
  )
  .then(() => {
    console.log('Table jobs created successfully');
  })
  .catch((err) => {
    console.error('Error in creating table jobs: ', err);
  });

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
