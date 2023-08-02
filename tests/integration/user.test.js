import { expect } from 'chai';
import request from 'supertest';

import app from '../../src/index';

var token;

describe('User APIs Test for registration', () => {
//   describe('Post /users', () => {
//     it('should return user created succesfully', (done) => {
//       let details = {
//         "firstName": "shiv",
//         "lastName": "mark",
//         "email": "shivs@223",
//         "password": "31231234"
//       }
//       request(app)
//         .post('/api/v1/users')
//         .send(details)
//         .end((err, res) => {
//           expect(res.statusCode).to.be.equal(201);
//           // expect(res.body.data).to.be.an('json');

//           done();
//         });
//     });
//   });
  describe('Post /users', () => {
    it('should return user already exists', (done) => {
      let details = {
        "firstName":"any",
        "lastName":"any",
        "email": "shivs@223",
        "password": "31231234"
      }
      request(app)
        .post('/api/v1/users')
        .send(details)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(400);
          // expect(res.body.data).to.be.an('json');
          done();
        });
    });
  });
  describe('Post /users', () => {
    it('should return invalid details', (done) => {
      let details = {}
      request(app)
        .post('/api/v1/users')
        .send(details)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          // expect(res.body.data).to.be.an('json');
          done();
        });
    });
  });
});

describe('User APIs Test for login', () => {
  describe('Post /login', () => {
    it('should return user login successfully', (done) => {
      let details = {
        "email": "shivs@223",
        "password": "31231234"
      }
      request(app)
        .post('/api/v1/users/login')
        .send(details)
        .end((err, res) => {
          token = res.body.data;
          expect(res.statusCode).to.be.equal(200);
          expect(res.body.data).to.be.an('string');
          done();
        });
    });
  });
  describe('Post /login', () => {
    it('should return invalid details', (done) => {
      let details = {
        "email": "shivganeshmarkad123@gmail.com",
      }
      request(app)
        .post('/api/v1/users/login')
        .send(details)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(400);
          done();
        });
    });
  });
  describe('Post /login', () => {
    it('should return details require', (done) => {
      let details = {}
      request(app)
        .post('/api/v1/users/login')
        .send(details)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(400);
          done();
        });
    });
  });
});

describe('Note API Test',()=>{
  describe('get /note',()=>{

    it('Should return all the notes',(done)=>{
      request(app)
        .get('/api/v1/note')
        .set('Authorization',`Bearer ${token}`)
        .send()
        .end((err,res)=>{
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
  });
  describe('get /note',()=>{

    it('Should return Authorization token required',(done)=>{
      request(app)
        .get('/api/v1/note')
        .set('Authorization',``)
        .send()
        .end((err,res)=>{
          expect(res.statusCode).to.be.equal(400);
          done();
        });
    });
  });
});