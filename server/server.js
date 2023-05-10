const express = require('express');
const session = require('express-session');
const path = require('path');
const userRouter = require('./routes/userRoutes');
const jobRouter = require('./routes/jobRoutes');
const CookieController = require('./controllers/CookieController');

const cors = require('cors');
require('./auth');
const passportSetup = require('./auth');
const passport = require('passport');
const app = express();
app.use(session({ secret: 'cats' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: 'http://localhost:8080',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);
app.use(express.json());
function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

// //routes
app.use('/user', userRouter);
app.use('/job', jobRouter);

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

app.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:8080/home',
    failureRedirect: '/auth/failure',
  }),
  CookieController.setOauthCookie,
  (req, res) => {
    // Set user ID cookie with a secure and HTTP-only option
   res.status(200).send('cookie created')
    // Redirect user to front-end URL
    
  }
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
app.get('/isAuthenticated', (req, res) => {
  if (req.user) {
    res.send({ authenticated: true });
  } else {
    res.send({ authenticated: false });
  }
});
//app.use(express.static(path.join(__dirname, './../client')));
//app.use(express.static(path.join(__dirname, './../build')));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../build/index.html'), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});
//allows refresh and direct navigation for react router

app.listen(3000, () => console.log('listening to 3000'));