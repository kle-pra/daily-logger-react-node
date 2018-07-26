const Log = require('../models/log.model');


module.exports = async () => {

  await Log.remove({});

  const log1 = new Log({
    title: 'Best thing ever',
    user: 'kle-pra'
  });

  const log2 = new Log({
    title: 'Best thing ever',
    user: 'kle-pra'
  });

  const log3 = new Log({
    title: 'Best thing ever',
    user: 'kle-pra'
  });

  await log1.save();
  await log2.save();
  await log3.save();
}
