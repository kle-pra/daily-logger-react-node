const mongoose = require('mongoose');
const app = require('./app');
const dbRunner = require('./config/dbRunner');
const port = process.env.PORT || 9999;

//connect to DB
mongoose.connect('mongodb://localhost:27017/logger-node', { useNewUrlParser: true })
  .then(() => {
    console.log('connected to db');
    if (process.env != 'production') {
      dbRunner()
        .then(() => console.log('sample data inserted in dev mode'))
        .catch(error => {
          console.log('error inserting sample date: ' + error);
        })
    }
  }).catch(error => {
    console.log('error connecting to DB: ' + error);
  });

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});