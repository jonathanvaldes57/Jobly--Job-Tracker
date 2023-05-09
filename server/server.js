const express = require('express');
const path = require('path');
const userRouter = require('./routes/userRoutes');
const jobRouter = require('./routes/jobRoutes');

const app = express();
app.use(express.json());

// app.use(express.static(path.join(__dirname, './../client')));
app.use(express.static(path.join(__dirname, './../build')));

//routes
app.use('/user', userRouter);
app.use('/job', jobRouter);
//allows refresh and direct navigation for react router
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../build/index.html'), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(3000, () => console.log('listening to 3000'));
