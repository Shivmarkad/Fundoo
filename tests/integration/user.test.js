import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../src/index';

var token;
var details;
var noteId;
describe('User APIs Test for registration', () => {

  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        // This will give one by one collection to delete it.
        mongoose.connection.collections[collection].deleteOne(() => {});
        // To delete collections so that the testing
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });

  describe('Post /users', () => {
    it('should return user created succesfully', (done) => {
      let details = {
        firstName: "shiv",
        lastName: "mark",
        email: "shivs@223",
        password: "31231234"
      }
      request(app)
        .post('/api/v1/users')
        .send(details)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
        });
        done();
    });
  
    it('should return user already exists', (done) => {
      let details = {
        firstName: "shiv",
        lastName: "mark",
        email: "shivs@223",
        password: "31231234"
      }
      request(app)
        .post('/api/v1/users')
        .send(details)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(400);
        });
        done();
    });
  
    it('should return invalid details', (done) => {
      let details = {}
      request(app)
        .post('/api/v1/users')
        .send(details)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
        });
        done();
    });
  });
  describe('Post /login', () => {
    it('should return user login successfully', (done) => {
      let details = {
        email: "shivs@223",
        password: "31231234"
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
        email: "shivganesh@gmail.com",
      };
      request(app)
        .post('/api/v1/users/login')
        .send(details)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
 
    it('should return details require', (done) => {
      details = {};
      request(app)
        .post('/api/v1/users/login')
        .send(details)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });

  describe('Post /note',()=>{
    it('Should return note created successfully',(done)=>{
      let details = {
        title:"to add note",
        description:"testing the note"
      }
      request(app)
        .post('/api/v1/note')
        .set('Authorization',`Bearer ${token}`)
        .send(details)
        .end((err,res)=>{
          expect(res.statusCode).to.be.equal(201);
          done();
          noteId = res.body.data._id;
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
        title:"to add note"
      }
      request(app)
        .post('/api/v1/note')
        .set('Authorization',`Bearer ${token}`)
        .send(details)
        .end((err,res)=>{
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });

  describe('get /note',()=>{
    it('Should return note found',(done)=>{
      request(app)
        .get(`/api/v1/note/${noteId}`)
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
  });

  describe('Put /note',()=>{

    it('Should return note updated successfully',(done)=>{
      
      details = {
        title:"new updated note",
        description:"updating the note"
      }
      request(app)
        .put(`/api/v1/note/${noteId}`)
        .set('Authorization',`Bearer ${token}`)
        .send(details)
        .end((err,res)=>{
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
  
    it('Should return note description field required',(done)=>{
      details = {
        "title":"checking the invalid details"
      }
      request(app)
        .put(`/api/v1/note/${noteId}`)
        .set('Authorization',`Bearer ${token}`)
        .send()
        .end((err,res)=>{
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });
});