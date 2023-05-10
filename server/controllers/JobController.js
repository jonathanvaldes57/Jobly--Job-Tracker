const db = require('../models/job-tracker-Models');

const JobController = {
  async createJob(req, res, next) {
    console.log('this is reques body', req.body)
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
    const { jobs_id } = req.body;
    try {
      const result = await db.query(
        'DELETE FROM jobs WHERE id = $1 RETURNING *',
        [jobs_id]
      );
      res.locals.deletedJob = result.rows[0];
      next();
    } catch (err) {
      console.log('error in getJobs request ', err);
      return next(err);
    }
  },
};

module.exports = JobController;
