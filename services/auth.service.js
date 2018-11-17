const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

module.exports.registerUser = async (userObj) => {
  //pass is hashed pre-save
  return await new User({
    username: userObj.username,
    password: userObj.password
  }).save();
}

module.exports.loginUserJwt = async (userObj) => {
  try {
    const user = await User.findByCredentials(userObj.username, userObj.password);
    return await user.generateToken();
  } catch (err) {
    console.log(err);
    throw err;
  }
}