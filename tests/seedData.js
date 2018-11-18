const { ObjectID } = require('mongodb');
const User = require('../models/user.model');
const Log = require('../models/log.model');

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

const testLogs = [
  {
    _id: new ObjectID(),
    title: 'testTitleUser1-1',
    body: 'testBody1',
    user: userOneId
  },
  {
    _id: new ObjectID(),
    title: 'testTitleUser1-2',
    body: 'testBody2',
    user: userOneId

  },
  {
    _id: new ObjectID(),
    title: 'testTitleUser2-1',
    body: 'testBody3',
    user: userTwoId
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
      console.log(error);
      return done(error);
    });
}

const insertTestLogs = (done) => {
  Log.deleteMany({})
    .then(() => Log.insertMany(testLogs))
    .then(() => done())
    .catch(error => {
      done(error);
    });
}

module.exports = {
  testUsers,
  testLogs,
  insertTestUsers,
  insertTestLogs,
}