const Log = require('../models/log.model');
const userService = require('../services/auth.service');

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
  try {

    await userService.registerUser({ username: 'user', password: 'password' });
  } catch (e) {
    //if user exists catch error
    console.log(e.message);
  }
}
