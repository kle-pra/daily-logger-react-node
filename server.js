const mongoose = require('mongoose');
const app = require('./app');
const dbRunner = require('./config/dbRunner');
const port = process.env.PORT || 9999;

//connect to DB
require('./config/db.config');
// inser dev mode data
if (process.env.NODE_ENV != 'production') {
  dbRunner()
    .then(() => console.log('sample data inserted in dev mode'))
    .catch(error => {
      console.log('error inserting sample date: ' + error);
    })
}
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});