const mongoose = require('mongoose');


mongoose.connect('mongodb://reactlogger:reactlogger1@ds257551.mlab.com:57551/daily-logger-react', { useNewUrlParser: true })
  .then(() => {
    console.log('connected to db');
  }).catch(error => {
    console.log('error connecting to DB: ' + error);
  });