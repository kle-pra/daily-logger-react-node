const expect = require('expect');
const User = require('../models/user.model');
const { insertTestUsers, testUsers, testTokens } = require('./seedData');

require('../config/db.config');

describe('User model tests', () => {

  beforeEach(insertTestUsers);

  describe('find by credentials', () => {

    it('should find user in db by valid credentials -async', async () => {

      const user = await User.findByCredentials(testUsers[0].username, testUsers[0].password);
      expect(user).toBeTruthy();
      expect(user.username).toBe(testUsers[0].username);
      //pass od user from DB should be encrypted
      expect(user.password).not.toBe(testUsers[0].password);
    })

    it('should find user in db by valid credentials - with promises', (done) => {

      User
        .findByCredentials(testUsers[0].username, testUsers[0].password)
        .then(user => {
          expect(user).toBeTruthy();
          expect(user.username).toBe(testUsers[0].username);
          //pass od user from DB should be encrypted
          expect(user.password).not.toBe(testUsers[0].password);
          done();
        }).catch(error => done(error));
    })

    it('should not find user in db by invalid credentials - with promises', (done) => {

      User
        .findByCredentials("123", "345")
        .then((user) => {
          done(new Error('Expected method to reject.'))
        })
        .catch(error => {
          expect(error).toBeTruthy()
          done()
        });
    })

  });

});