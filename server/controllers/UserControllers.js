const db = require('../models/job-tracker-Models');

const UserController = {
  async createUser(req, res, next) {
    const { name, email, password } = req.body;

    try {
      const result = await db.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
        [name, email, password]
      );

      // attach the newly created user data to the request object
      req.newUser = result.rows[0];

      // call the `next` function to pass control to the next middleware function
      next();
    } catch (err) {
      console.error(err);
      next(err); // pass the error to the error-handling middleware
    }
  },
  async loginUser(req, res, next) {
    const { email, password } = req.body;

    try {
      const result = await db.query(
        'SELECT * FROM users WHERE email = $1 AND password = $2',
        [email, password]
      );

      if (result.rowCount === 0) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // attach the user data to the request object
      req.user = result.rows[0];
      const userId = result.rows[0].id;
      res.locals.userId = userId;
      // call the `next` function to pass control to the next middleware function
      next();
    } catch (err) {
      console.error(err);
      next(err); // pass the error to the error-handling middleware
    }
  },
};

module.exports = UserController;
