const express = require('express');
const parser = require('body-parser');
const passport = require('passport');
const app = express();

app.use(express.static('static'));

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
// Passport Middleware
app.use(passport.initialize());
const jwtStrategy = require('./config/security.config');
passport.use(jwtStrategy);
app.use('/api/logs', passport.authenticate('jwt', { session: false }), require('./routes/log.route'));
app.use('/api/auth', require('./routes/auth.route'));

app.get('/', (req, res) => {
  return res.sendFile('index');
});

module.exports = app;