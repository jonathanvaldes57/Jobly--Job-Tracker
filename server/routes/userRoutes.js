const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserControllers');
const CookieController = require('../controllers/CookieController');

router.post('/createuser', UserController.createUser, (req, res) => {
  res.status(200).send('User created successfully!');
});

router.post(
  '/login',
  UserController.loginUser,
  CookieController.setSSIDCookie,
  (req, res) => {
    res.status(200).send('Logged in successfully');
  }
);
module.exports = router;
