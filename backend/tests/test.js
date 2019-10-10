// file: test/api.js
const request = require('supertest');
const app = require('./../app');
const expect = require('chai').expect;

describe('Login API', function() {
    it('Should success if credential is valid', function(done) {
        request(app)
           .post('/login')
           .set('Accept', 'application/json')
           .set('Content-Type', 'application/json')
           .send({ email:'optimus.prime@autobots.com', password: 'validPassword1234!' })
           .expect(200)
           .expect('Content-Type', /json/)
           .expect(function(response) {
              expect(response.body).not.to.be.empty;
              expect(response.body).to.be.an('object');
           })
           .end(done);
    }); 
});

describe('Invalid inputs Login API', function() {
    it('Should return 401 if are input invalid', function(done) {
        request(app)
           .post('/login')
           .set('Accept', 'application/json')
           .set('Content-Type', 'application/json')
           .send({ email:'email@gmail.com', password: 'pass' })
           .expect(function(response) {
                expect(response.status === 401)
                expect(response.unauthorized === true)
         })
         .end(done);
    }); 
});

describe('Encode API', function() {
    it('Should success if input string exist', function(done) {
        request(app)
           .post('/encode')
           .set('Authorization', 'xyz0987654321')
           .set('Accept', 'application/json')
           .set('Content-Type', 'application/json')
           .send({string:'AABBAA'})
           .expect(200)
           .expect('Content-Type', /json/)
           .expect(function(response) {
              expect(response.body).not.to.be.empty;
              expect(response.body).to.be.an('object');
           })
           .end(done);
    }); 
});



describe('Encode Middleware API', function() {
    it('Should success with status 401 if token not exist', function(done) {
        request(app)
           .post('/encode')
           .set('Accept', 'application/json')
           .set('Content-Type', 'application/json')
           .send({string:'AABBAA'})
           .expect(function(response) {
              expect(response.status === 401)
              expect(response.unauthorized === true)
           })
           .end(done);
    }); 
});