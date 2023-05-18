const express = require('express');
const router = express.Router();
const JobController = require('../controllers/JobController');

router.post('/createjob', JobController.createJob, (req, res) => {
  res.status(200).send('Job created successfully!');
});

router.post('/getjobs', JobController.getJobs, (req, res) => {
  res.status(200).json(res.locals.jobs);
});

router.delete('/deletejob/:id', JobController.deleteJob, (req, res) => {
  res.status(200).json(res.locals.deletedJob);
});

router.patch('/updatejob', JobController.updateJob, (req, res) => {
  res.status(200).json(res.locals.updatedJob);
});
module.exports = router;
