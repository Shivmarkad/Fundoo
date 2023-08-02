import { expect } from 'chai';
import request from 'supertest';

import app from '../../src/index';
import { details } from '@hapi/joi/lib/errors';

var token ;

describe('User APIs Test', () => {
  describe('Post /users', () => {
    it('should return user created succesfully', (done) => {
      let details = {
        "firstName":"shiv",
        "lastName":"mark",
        "email":"shivganesh3@223",
        "password":"31231234"
      }
      request(app)
        .post('/api/v1/users')
        .send(details)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          // expect(res.body.data).to.be.an('json');

          done();
        });
    });
  });
  describe('Post /login', () => {
    it('should return user login successfully', (done) => {
      let details = {
        "email":"shivganesh3@223",
        "password":"31231234"
      }
      request(app)
        .post('/api/v1/users/login')
        .send(details)
        .end((err, res) => {
          token = res.body.data;
          expect(res.statusCode).to.be.equal(200);
          // expect(res.body.data).to.be.an('json');

          done();
        });
    });
  });
  describe('Post /login', () => {
    it('should return invalid details', (done) => {
      let details = {
        "email":"shivganeshmarkad123@gmail.com",
      }
      request(app)
        .post('/api/v1/users/login')
        .send(details)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(400);
          // expect(res.body.data).to.be.an('array');

          done();
        });
    });
  });
});
