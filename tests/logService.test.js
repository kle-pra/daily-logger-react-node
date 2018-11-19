const expect = require('expect');
const logService = require('../services/log.service');
const assert = require('chai').assert;
const sinon = require('sinon');
const Log = require('../models/log.model');
const { testUsers, testLogs } = require('./seedData');
describe('Log Service - bussiness logic', () => {
  describe('get logs for date with  with mocking Log model', () => {
    it('should get logs based on date or', (done) => {

      const now = new Date();

      const log = sinon.mock(Log);
      log
        .expects('find')
        .exactly(1)
        .withArgs(sinon.match.object)
        .returns(testLogs);

      logService.getLogsForDate(now, testUsers[0])
        .then(logs => {
          expect(logs).toEqual(testLogs);
          log.verify();
          log.restore();
          return done();
        })
        .catch(err => done(err));
    })
  });

  describe('get logs for date with stubbing find function from Log model', () => {
    it('should get logs based on date or', (done) => {

      const now = new Date();

      const find = sinon.stub(Log, 'find');
      find
        .withArgs(sinon.match.object)
        .returns(testLogs);

      logService.getLogsForDate(now, testUsers[0])
        .then(logs => {

          expect(logs).toEqual(testLogs);
          assert(find.called);
          find.restore();
          return done();
        })
        .catch(err => done(err));
    })
  });
});
