const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = new Schema({
  title: String,
  body: String,
  user: String,
  date: { type: Date, default: Date.now },
});

const Log = mongoose.model('Log', logSchema);
module.exports = Log;