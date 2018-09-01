const request = require('supertest');
const expect = require('expect');

const app = require('./../app');


it('Should return 200 status on root', (done) => {
  request(app)
    .get('/')
    .expect(200)
    .end(done);
});

it('Should return 401 status on protected', (done) => {
  request(app)
    .get('/api/logs')
    .expect(401)
    .end(done);
});

it('Should return 500 status on POST to login without credntials', (done) => {
  request(app)
    .post('/api/auth/login')
    .expect(500)
    .end(done);
});
