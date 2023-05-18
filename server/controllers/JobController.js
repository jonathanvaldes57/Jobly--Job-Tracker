const db = require('../models/job-tracker-Models');

const JobController = {
  async createJob(req, res, next) {
    console.log('this is reques body', req.body);
    const {
      company_name,
      job_title,
      interest_level,
      status,
      url,
      date,
      description,
      users_id,
    } = req.body;

    try {
      const result = await db.query(
        'INSERT INTO jobs (company_name, job_title, interest_level, status, url, date, description, users_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        [
          company_name,
          job_title,
          interest_level,
          status,
          url,
          date,
          description,
          users_id,
        ]
      );

      // attach the newly created user data to the request object
      req.newJob = result.rows[0];

      // call the `next` function to pass control to the next middleware function
      next();
    } catch (err) {
      console.error(err);
      next(err); // pass the error to the error-handling middleware
    }
  },

  async getJobs(req, res, next) {
    const { user_id } = req.body;

    try {
      const applied = await db.query(
        `
            SELECT * from jobs where users_id = '${user_id}' AND status = 'applied';
        `
      );
      const interview = await db.query(
        `
            SELECT * from jobs where users_id = '${user_id}' AND status = 'interview';
        `
      );
      const offer = await db.query(
        `
            SELECT * from jobs where users_id = '${user_id}' AND status = 'offer';
        `
      );
      const rejected = await db.query(
        `
            SELECT * from jobs where users_id = '${user_id}' AND status = 'rejected';
        `
      );
      res.locals.jobs = {
        applied: applied.rows,
        interview: interview.rows,
        offer: offer.rows,
        rejected: rejected.rows,
      };
      return next();
    } catch (err) {
      console.log('error in getJobs request ', err);
      return next(err);
    }
  },
  async deleteJob(req, res, next) {
    const { id } = req.params;
    try {
      const result = await db.query(
        'DELETE FROM jobs WHERE id = $1 RETURNING *',
        [id]
      );
      res.locals.deletedJob = result.rows[0];
      return next();
    } catch (err) {
      console.log('error in getJobs request ', err);
      return next(err);
    }
  },

  async updateJob(req, res, next) {
    const {
      company_name,
      job_title,
      interest_level,
      status,
      url,
      description,
      users_id,
      id,
    } = req.body;

    try {
      const result = await db.query(
        `UPDATE jobs SET company_name = $1, job_title = $2, interest_level = $3, status = $4, url = $5, description = $6, users_id = $7 WHERE id = $8`,
        [
          company_name,
          job_title,
          interest_level,
          status,
          url,
          description,
          users_id,
          id,
        ]
      );
      res.locals.updateJob = result.rows[0];
      return next();
    } catch (err) {
      console.log('error caught in the updateJob middleware function: ', err);
      return next(err);
    }
  },
};

module.exports = JobController;
