const express = require('express');
const parser = require('body-parser');

const app = express();

app.use(express.static('static'));

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use('/api/logs', require('./routes/log.route'));
app.use('/api/auth', require('./routes/auth.route'));



app.get('/', (req, res) => {
  return res.sendFile('index');
});

module.exports = app;