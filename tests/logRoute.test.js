const supertest = require('supertest');
const expect = require('expect');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Log = require('../models/log.model');
const { insertTestUsers, testUsers, insertTestLogs, testLogs } = require('./seedData');
const app = require('../app');
require('../config/db.config');

after((done) => {
  mongoose.disconnect().then(() => {
    done();
  });
});

describe('log route tests', () => {
  beforeEach(insertTestUsers);
  beforeEach(insertTestLogs);

  describe('GET /log', () => {

    it('should get logs for user with valid JWT token', (done) => {
      supertest(app)
        .get('/api/logs/')
        .set('Authorization', 'Bearer ' + jwt.sign({ data: testUsers[0].username }, 's3cr3t', { expiresIn: 604800 }))
        .expect(200)
        .expect(res => {
          expect(res.body.length).toBe(2);
          expect(res.body[0].title).toBe(testLogs[0].title);
        })
        .end(done);

    });

    it('should get 401 user with unexisting user with JWT token', (done) => {
      supertest(app)
        .get('/api/logs/')
        .set('Authorization', 'Bearer ' + jwt.sign({ data: "unexsitingUsername" }, 's3cr3t', { expiresIn: 604800 }))
        .expect(401)
        .end(done);
    });

    it('should get 401 without JWT token', (done) => {
      supertest(app)
        .get('/api/logs/')
        .expect(401)
        .end(done);
    });
  });

  describe('DELETE log', () => {

    it('should delete log from user with valid JWT token', (done) => {
      supertest(app)
        .delete('/api/logs/' + testLogs[0]._id)
        .set('Authorization', 'Bearer ' + jwt.sign({ data: testUsers[0].username }, 's3cr3t', { expiresIn: 604800 }))
        .expect(204)
        .expect(res => {
          expect(res.body).toBeFalsy;
        })
        .end((err, res) => {
          if (err) {
            return done();
          }
          Log.find({ user: testUsers[0]._id })
            .then(logs => {
              expect(logs.length).toBe(1);
              return done();
            }).catch(err => {
              return done(err)
            })
        });
    });

    it('should not delete log from user other user with valid JWT token', (done) => {
      supertest(app)
        .delete('/api/logs/' + testLogs[2]._id)
        .set('Authorization', 'Bearer ' + jwt.sign({ data: testUsers[0].username }, 's3cr3t', { expiresIn: 604800 }))
        .expect(204)
        .expect(res => {
          expect(res.body).toBeFalsy;
        })
        .end((err, res) => {
          if (err) {
            return done();
          }
          Log.find({ user: testUsers[1]._id })
            .then(logs => {
              expect(logs.length).toBe(1);
              return done();
            }).catch(err => {
              return done(err)
            })
        });
    });
  });

  describe('POST log', () => {

    it('should add new log with valid JWT token', (done) => {

      const newLog = {
        title: 'New log'
      };
      supertest(app)
        .post('/api/logs/')
        .send(newLog)
        .set('Authorization', 'Bearer ' + jwt.sign({ data: testUsers[0].username }, 's3cr3t', { expiresIn: 604800 }))
        .expect(200)
        .expect(res => {
          expect(res.body).toBeTruthy();
          expect(res.body.titel).toBe(newLog.title);
        })
        .end((err, res) => {
          if (err) {
            return done();
          }
          Log.find({ user: testUsers[0]._id })
            .then(logs => {
              expect(logs.length).toBe(3);
              return done();
            }).catch(err => {
              return done(err)
            })
        });
    });
    it('should not add log with empty title with valid JWT token', (done) => {

      const newLog = {
        title: ''
      };
      supertest(app)
        .post('/api/logs/')
        .send(newLog)
        .set('Authorization', 'Bearer ' + jwt.sign({ data: testUsers[0].username }, 's3cr3t', { expiresIn: 604800 }))
        .expect(500)
        .end((err, res) => {
          if (err) {
            return done();
          }
          Log.find({ user: testUsers[0]._id })
            .then(logs => {
              expect(logs.length).toBe(2);
              return done();
            }).catch(err => {
              return done(err)
            })
        });
    });
  });

  describe('Update log', () => {

    const updatedLog = {
      title: 'Updated Title',
      body: 'Updated Body',
      date: new Date()
    }

    it('should update log entry with valid user', (done) => {
      supertest(app)
        .put(`/api/log/${testLogs[0]._id}`)
        .send(updatedLog)
        .set('Authorization', `Bearer ${jwt.sign({ data: testUsers[0].username }, 's3cr3t', { expiresIn: 604800 })}`)
        .expect(200)
        .expect(res => {
          expect(res.id).toBe(testLogs[0]._id);
          expect(res.title).toBe(updatedLog.title);
          expect(res.body).toBe(updatedLog.body);
          expect(res.date).toBe(updatedLog.date);
        }).end((err, res) => {
          if (err) {
            return done();
          }
          Log.findOne({ _id: res.body._id }).then(log => {
            expect(log.title).toBe(updatedLog.title);
            expect(log.body).toBe(updatedLog.body);
            return done(err);
          }).catch(err => done(err));

        });
    })

  })

});
