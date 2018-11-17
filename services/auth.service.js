const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.registerUser = async (userObj) => {
  //pass is hashed pre-save
  return await new User({
    username: userObj.username,
    password: userObj.password
  }).save();
}

module.exports.loginUserJwt = async (userObj) => {
  try {
    const user = await User.findOne({ username: userObj.username });
    if (!user || !bcrypt.compareSync(userObj.password, user.password)) {
      throw 'Wrong credentials';
    } else {
      return jwt.sign({ data: user.username }, 's3cr3t', {
        expiresIn: 604800 // 1 week
      });
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}