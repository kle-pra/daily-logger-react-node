const { ObjectID } = require('mongodb');
const User = require('../models/user.model');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const testUsers = [
  {
    _id: userOneId,
    username: 'testUsername1',
    password: 'testPassword1'
  },
  {
    _id: userTwoId,
    username: 'testUsername2',
    password: 'testPassword2'
  }
];

const insertTestUsers = (done) => {
  User.deleteMany({})
    .then(() => {

      const user1promise = new User(testUsers[0]).save();
      const user2promise = new User(testUsers[1]).save();
      return Promise.all([user1promise, user2promise]);
    })
    .then(() => done())
    .catch(error => {
      done(error);
    });
}

module.exports = {
  testUsers,
  insertTestUsers
}