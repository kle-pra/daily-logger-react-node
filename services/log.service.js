const Log = require('../models/log.model');

module.exports.getLogs = async () => {
  const logs = await Log.find();
  return logs;
};

module.exports.getLogsForDate = async (date, user) => {

  let month = date.getMonth();
  let day = date.getDate() + 1;
  let year = date.getFullYear();

  const logs = await Log.find({
    user: user.id,
    date: {
      $gte: new Date(year, month, day - 1),
      $lt: new Date(year, month, day)
    }
  });
  return logs;
};

module.exports.saveLog = async (log, user) => {
  const newlog = new Log(log);
  newlog.user = user.id;
  return await newlog.save();;
};

module.exports.updateLog = async (id, logData, user) => {
  return await Log.findOneAndUpdate({
    _id: id,
    user: user.id
  }, logData, { new: true });
};

module.exports.deleteLog = async (id, user) => {
  await Log.findOneAndRemove({
    id: id,
    user: user.id
  });
};

