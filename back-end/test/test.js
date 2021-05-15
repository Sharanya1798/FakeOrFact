const chai = require('chai')
const expect = chai.expect;
const request = require('supertest');
const mongoose = require('mongoose');
const chaiHttp = require('chai-http');
const should = chai.should;

const app = require("../server");

describe('/POST Authentication', () => {

    before((done) => {
        mongoose.connect("mongodb+srv://Sharanya:Sharna&ashu798@fakeorfact.9ynja.mongodb.net/Major_project?retryWrites=true&w=majority",{ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false })
        .then(()=>{
            console.log("Database is connected");
        })
        .then(() => done())
        .catch((err) => done(err));
    })

    it('Positive testcase for Login api fetch', (done) => {
        request(app).post('/signin')
          .send({ userName: 'sharanya', password: "sharna" })
          .then((res) => {
            const body = res.body;
            expect(body).to.contain.property('new_token');
            done();
          })
          .catch((err) => done(err));
    });

    it('Negative testcase for Login api fetch', (done) => {
        request(app).post('/signin')
          .send({ userName: 'sharanya', password: "sharna1" })
          .then((res) => {
            const body = res.body;
            expect(body).to.contain.property('msg');
            done();
          })
          .catch((err) => done(err));
    });

    it('Positive testcase for register api fetch', (done) => {
        request(app).post('/signup')
          .send({ userName: 'ajay11', email: 'shobha1@gmail.com', password: "sharna", password2: "sharna" })
          .then((res) => {
            const body = res.body;
            expect(body).to.contain.property('details');
            done();
          })
          .catch((err) => done(err));
    });

    it('Negative testcase for register api fetch', (done) => {
        request(app).post('/signup')
          .send({ userName: 'shobha12', email: 'shobha1@gmail.com', password: "sharna", password2: "sharna1" })
          .then((res) => {
            const body = res.body;
            expect(body).to.contain.property('msg');
            done();
          })
          .catch((err) => done(err));
    });
   
    it('Positive testcase for creating a post api fetch', (done) => {
        request(app).post('/raiseQuery')
          .send({ email: 'shobha1@gmail.com', queryName: "Hello", queryDescription: "Hello...guys..I am a dummy post for the purpose of testing", user_ID: "6081b906832d6c5d3ddc1604" })
          .then((res) => {
            const body = res.body;
            expect(body).to.contain.property('posted');
            done();
          })
          .catch((err) => done(err));
    });

    it('Negative testcase for creating a post api fetch', (done) => {
        request(app).post('/raiseQuery')
          .send({ email: 'shobha1@gmail.com', queryName: "Hello", queryDescription: "Hello...guys..I am a dummy post for the purpose of testing", user_ID: "" })
          .then((res) => {
            const body = res.body;
            expect(body).to.contain.property('msg');
            done();
          })
          .catch((err) => done(err));
    });

    it('Positive testcase for retrieving my posts api fetch', (done) => {
        request(app).post('/myDiscussions')
          .send({ user_ID: "6081b906832d6c5d3ddc1604" })
          .then((res) => {
            const body = res.body;
            expect(body).to.contain.property('myPosts');
            done();
          })
          .catch((err) => done(err));
    });  
    
    it('Negative testcase for retrieving my posts api fetch', (done) => {
        request(app).post('/myDiscussions')
          .send({ user_ID: "" })
          .then((res) => {
            const body = res.body;
            expect(body).to.contain.property('msg');
            done();
          })
          .catch((err) => done(err));
    });  

});




