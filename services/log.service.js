const Log = require('../models/log.model');

module.exports.getLogs = async () => {
  const logs = await Log.find();
  return logs;
};

module.exports.getLogsForDate = async (date) => {

  let month = date.getMonth();
  let day = date.getDate() + 1;
  let year = date.getFullYear();

  const logs = await Log.find({
    date: {
      $gte: new Date(year, month, day - 1),
      $lt: new Date(year, month, day)
    }
  });
  return logs;
};

module.exports.saveLog = async (log) => {
  const newlog = new Log(log);
  return await newlog.save();;
};

module.exports.updateLog = async (id, logData) => {
  return await Log.findOneAndUpdate({ _id: id }, logData, { new: true });
};

module.exports.deleteLog = async (id) => {
  await Log.findByIdAndRemove(id);
};

