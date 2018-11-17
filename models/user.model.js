const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

userSchema.methods.toJSON = function () {
  const userJson = this.toObject();
  delete userJson.password;
  return userJson;
}

userSchema.pre('save', function (next) {
  const user = this;
  if (user.isModified('password')) {
    bcryptjs.genSalt(10)
      .then(salt => bcryptjs.hash(user.password, salt))
      .then(hash => {
        user.password = hash;
        next();
      })
      .catch(error => {
        return Promise.reject(error);
      })
  } else {
    next();
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;