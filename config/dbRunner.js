const Log = require('../models/log.model');
const userService = require('../services/auth.service');
const User = require('../models/user.model');

module.exports = async () => {
  await User.remove({});
  await Log.remove({});

  try {
    const user = await userService.registerUser({ username: 'user', password: 'password' });
    const log1 = new Log({
      title: 'Best thing ever',
      user: user.id
    });

    const log2 = new Log({
      title: 'Best thing ever',
      user: user.id
    });

    const log3 = new Log({
      title: 'Best thing ever',
      user: user.id
    });

    await log1.save();
    await log2.save();
    await log3.save();
  } catch (e) {
    console.log(e.message);
  }




}
