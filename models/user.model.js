const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

userSchema.methods.toJSON = function () {
  const userJson = this.toObject();
  delete userJson.password;
  return userJson;
};

userSchema.methods.generateToken = function () {
  const user = this;
  return Promise.resolve(jwt.sign({ data: user.username }, 's3cr3t', {
    expiresIn: 604800 // 1 week
  }));
}

userSchema.statics.findByCredentials = function (username, password) {
  const User = this;
  let userInDb = null;
  return User.findOne({ username })
    .then(user => {
      if (!user) {
        return Promise.reject("User doesn't exist");
      }
      userInDb = user;
      return bcryptjs.compare(password, user.password);
    })
    .then(passwordsMatch => {
      if (passwordsMatch) {
        return userInDb;
      } else
        return Promise.reject('Wrong credentials');
    })
    .catch(err => {
      console.log(err);
      return Promise.reject(err);
    });
};

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