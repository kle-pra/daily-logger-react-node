const mongoose = require('mongoose');
let MONGO_URL;

if (process.env.NODE_ENV == 'production') {
  MONGO_URL = 'mongodb://reactlogger:reactlogger1@ds257551.mlab.com:57551/daily-logger-react';
} else if (process.env.NODE_ENV == 'test') {
  MONGO_URL = 'mongodb://localhost:27017/daily-logger-react-test';
} else if (process.env.NODE_ENV == 'travis') {
  MONGO_URL = 'mongodb://localhost:27017/daily-logger-react-travis';
} else {
  MONGO_URL = 'mongodb://localhost:27017/daily-logger-react-dev';
}

mongoose.connect(MONGO_URL, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to db');
  }).catch(error => {
    console.log('error connecting to DB: ' + error);
  });
