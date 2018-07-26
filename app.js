const express = require('express');
const parser = require('body-parser');

const app = express();

app.use(express.static('static'));

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use('/api/logs', require('./routes/log.route'));



app.get('/', (req, res) => {
  return res.sendFile('index');
});

module.exports = app;