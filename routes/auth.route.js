const express = require('express');
const router = express.Router();
const authService = require('../services/auth.service');

router.post('/register', async (req, res) => {

  if (!req.body.username || !req.body.password) {
    res.status(500).json({
      error: 'Username/password not send!'
    });
  }
  var user = {
    username: req.body.username,
    password: req.body.password
  }
  try {
    const newUser = await authService.registerUser(user);
    res.json(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err
    });

  }

});

router.post('/login', async (req, res) => {

  if (!req.body.username || !req.body.password) {
    return res.status(500).json({
      error: 'Username/password not send!'
    });
  }

  var user = {
    username: req.body.username,
    password: req.body.password
  }

  try {
    const token = await authService.loginUserJwt(user);
    res.json({ jwt: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  }
});

module.exports = router;