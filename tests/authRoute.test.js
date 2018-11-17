const supertest = require('supertest');
const expect = require('expect');
const User = require('../models/user.model');
const { insertTestUsers, testUsers } = require('./seedData');
const app = require('../app');

require('../config/db.config');

describe('auth route tests', () => {

  beforeEach(insertTestUsers);

  describe('POST /register', () => {

    it('should register a user and return user object', (done) => {

      const credentials = {
        username: 'testUser',
        password: 'testPassword'
      }

      supertest(app)
        .post('/api/auth/register')
        .send(credentials)
        .expect(200)
        .expect(res => {
          expect(res.body.username).toBe(credentials.username);
          expect(res.body.password).toBeFalsy();
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          User.findOne({ username: res.body.username })
            .then(user => {
              expect(user.username).toBe(credentials.username);
              expect(user.password).toBeTruthy();
              expect(user.password).not.toBe(credentials.password);
              done();
            })
            .catch(error => {
              done(error);
            })
        });
    });

    it('should return 500 when registering without username/password', (done) => {
      supertest(app)
        .post('/api/auth/register')
        .expect(500)
        .expect(res => {
          expect(typeof res.body.error).toBe('string');
        })
        .end(done);
    });

    it('should return 500 when registering without password', (done) => {
      supertest(app)
        .post('/api/auth/register')
        .send({ username: 'testUsername' })
        .expect(500)
        .expect(res => {
          expect(typeof res.body.error).toBe('string');
        })
        .end(done);
    });

    it('should return 500 when registering without username', (done) => {
      supertest(app)
        .post('/api/auth/register')
        .send({ password: 'password' })
        .expect(500)
        .expect(res => {
          expect(typeof res.body.error).toBe('string');
        })
        .end(done);
    });

    it('should return 500 when registering with existing username', (done) => {

      const credentials = {
        username: testUsers[0].username,
        password: 'testPassword'
      }
      supertest(app)
        .post('/api/auth/register')
        .send(credentials)
        .expect(500)
        .end(done);
    });
  });
})
