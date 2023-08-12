import { expect } from 'chai';
import request from 'supertest';

import app from '../../src/index';

var token;
var details;
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
      details = {
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
      details = {}
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
      details = {
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
  
    it('should return invalid details', (done) => {
      details = {
        "email": "shivganesh@gmail.com",
      };
      request(app)
        .post('/api/v1/users/login')
        .send(details)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(400);
          done();
        });
    });
 
    it('should return details require', (done) => {
      details = {};
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

describe('Note API Test for getAll the',()=>{
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

describe('Note API Test for create new note',()=>{
  describe('Post /note',()=>{
    it('Should return note created successfully',(done)=>{
      let details = {
        "title":"to add note",
        "description":"testing the note"
      }
      request(app)
        .post('/api/v1/note')
        .set('Authorization',`Bearer ${token}`)
        .send(details)
        .end((err,res)=>{
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });

    it('Should return require details',(done)=>{
      request(app)
        .post('/api/v1/note')
        .set('Authorization',`Bearer ${token}`)
        .send()
        .end((err,res)=>{
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });

    it('Should return all fields required',(done)=>{
      let details = {
        "title":"to add note"
      }
      request(app)
        .post('/api/v1/note')
        .set('Authorization',`Bearer ${token}`)
        .send()
        .end((err,res)=>{
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });
});

describe('Note API Test to find note',()=>{
  describe('get /note',()=>{
    it('Should return note found',(done)=>{
      let id = 15;
      request(app)
        .get(`/api/v1/note/${id}`)
        .set('Authorization',`Bearer ${token}`)
        .send()
        .end((err,res)=>{
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
 
    it('Should return note id mismatch',(done)=>{
      let id = 2;
      request(app)
        .get(`/api/v1/note/${id}`)
        .set('Authorization',`Bearer ${token}`)
        .send()
        .end((err,res)=>{
          expect(res.statusCode).to.be.equal(400);
          done();
        });
    });
  
    it('Should return invalid id',(done)=>{
      let id = "h";
      request(app)
        .get(`/api/v1/note/${id}`)
        .set('Authorization',`Bearer ${token}`)
        .send()
        .end((err,res)=>{
          expect(res.statusCode).to.be.equal(400);
          done();
        });
    });
  });
});

describe('Note API Test to update note',()=>{
  describe('Put /note',()=>{

    it('Should return note updated successfully',(done)=>{
      let id = 15;
      details = {
        "title":"new updated note",
        "description":"updating the note"
      }
      request(app)
        .put(`/api/v1/note/${id}`)
        .set('Authorization',`Bearer ${token}`)
        .send(details)
        .end((err,res)=>{
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
  
    it('Should return note description field required',(done)=>{
      let id = 15;
      details = {
        "title":"checking the invalid details"
      }
      request(app)
        .put(`/api/v1/note/${id}`)
        .set('Authorization',`Bearer ${token}`)
        .send()
        .end((err,res)=>{
          expect(res.statusCode).to.be.equal(400);
          done();
        });
    });
  
    it('Should return all fields required',(done)=>{
      let id = 15;
      details={}
      request(app)
        .put(`/api/v1/note/${id}`)
        .set('Authorization',`Bearer ${token}`)
        .send(details)
        .end((err,res)=>{
          expect(res.statusCode).to.be.equal(400);
          done();
        });
    });
  });
});