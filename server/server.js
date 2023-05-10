const express = require('express');
const session = require('express-session');
const path = require('path');
const userRouter = require('./routes/userRoutes');
const jobRouter = require('./routes/jobRoutes');
require('./auth');
const passport = require('passport');
const app = express();
const cors = require('cors');
app.use(cors({ origin: 'https://accounts.google.com' }));
app.use(session({ secret: 'cats' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}
// app.use(express.static(path.join(__dirname, './../client')));
app.use(express.static(path.join(__dirname, './../build')));

// //routes
app.use('/user', userRouter);
app.use('/job', jobRouter);
// app.get('/', (req, res) => {
//   res.send('<a href="/auth/google"> Authenticate with Google </a>');
// });
app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

app.get('/test', (req, res) => {
  res.redirect('/auth/google')
}
)

app.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:3000/home',
    failureRedirect: '/auth/failure',
  })
);
app.get('/auth/failure', (req, res) => {
  res.send('something went wrong ...');
});
app.get('/protected', isLoggedIn, (req, res) => {
  res.send(`'hello!' ${req.user.displayName}`);
});
app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        return next(err);
      }
      res.send('Goodbye!');
    });
  });
});
//allows refresh and direct navigation for react router
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../build/index.html'), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(3000, () => console.log('listening to 3000'));
