import { expect } from 'chai';
import request from 'supertest';

import app from '../../src/index';

let token ;

describe('User APIs Test', () => {
  describe('Post /users', () => {
    it('should return user created succesfully', (done) => {
      let details = {
        "firstName":"shiv",
        "lastName":"mark",
        "email":"shiv@w223",
        "password":"31231234"
      }
      request(app)
        .post('/api/v1/users')
        .send(details)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          // expect(res.body.data).to.be.an('array');

          done();
        });
    });
  });
  describe('Post /login', () => {
    it('should return user login successfully', (done) => {

      request(app)
        .get('/api/v1/users/login')
        .end((err, res) => {
          // token = 
          expect(res.statusCode).to.be.equal(200);
          expect(res.body.data).to.be.an('array');

          done();
        });
    });
  });
});
